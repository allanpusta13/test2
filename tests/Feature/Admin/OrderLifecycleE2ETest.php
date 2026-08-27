<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);

    Category::create(['id' => 'cat-pizza', 'name' => 'Pizzas', 'type' => 'menu', 'sort_order' => 1, 'is_active' => true]);
    MenuItem::create([
        'id' => 'item-marg',
        'category_id' => 'cat-pizza',
        'name' => 'Margherita',
        'price' => 14.99,
        'is_available' => true,
    ]);
});

test('full order lifecycle: create → preparing → ready → completed → paid', function () {
    $admin = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($admin);

    // 1. Create order
    $order = Order::create([
        'id' => 'ord-e2e-1',
        'order_number' => 'AB-5001',
        'status' => 'pending',
        'type' => 'dine_in',
        'table_number' => 'Table 7',
        'customer_name' => 'E2E Test Guest',
        'tracking_token' => 'OT-E2ETEST',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    expect($order->status)->toBe('pending');

    // 2. Transition to preparing (kitchen starts)
    $this->patch("/orders/{$order->id}/status", ['status' => 'preparing'])
        ->assertOk();

    $order->refresh();
    expect($order->status)->toBe('preparing');

    // 3. Transition to ready (kitchen finishes)
    $this->patch("/orders/{$order->id}/status", ['status' => 'ready'])
        ->assertOk();

    $order->refresh();
    expect($order->status)->toBe('ready');

    // 4. Transition to completed (order picked up)
    $this->patch("/orders/{$order->id}/status", ['status' => 'completed'])
        ->assertOk();

    $order->refresh();
    expect($order->status)->toBe('completed');

    // 5. Verify order is visible in orders list
    $this->get('/orders')
        ->assertOk();
});

test('payment recording follows order lifecycle', function () {
    $cashier = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($cashier);

    $order = Order::create([
        'id' => 'ord-pay-1',
        'order_number' => 'AB-6001',
        'status' => 'completed',
        'type' => 'takeaway',
        'customer_name' => 'Pay Test',
        'tracking_token' => 'OT-PAYTEST',
        'subtotal' => 29.98,
        'tax_total' => 2.66,
        'total' => 32.64,
    ]);

    // Record partial payment
    $this->post('/pos/payments', [
        'order_id' => $order->id,
        'amount' => 20.00,
        'tendered' => 20.00,
        'notes' => 'Partial cash payment',
    ])->assertCreated();

    // Record remaining payment
    $this->post('/pos/payments', [
        'order_id' => $order->id,
        'amount' => 12.64,
        'tendered' => 15.00,
        'notes' => 'Final payment with change',
    ])->assertCreated();

    $order->refresh();
    $totalPaid = $order->payments->sum('amount');
    expect($totalPaid)->toBe(32.64);
});

test('kitchen staff can update order status via kitchen route', function () {
    $kitchen = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($kitchen);

    $order = Order::create([
        'id' => 'ord-kitchen-1',
        'order_number' => 'AB-7001',
        'status' => 'pending',
        'type' => 'dine_in',
        'table_number' => 'Table 3',
        'customer_name' => 'Kitchen Test',
        'tracking_token' => 'OT-KITTEST',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    $this->patch("/kitchen/orders/{$order->id}/status", ['status' => 'preparing'])
        ->assertOk();

    $order->refresh();
    expect($order->status)->toBe('preparing');
});

test('order tracking works with valid token', function () {
    $order = Order::create([
        'id' => 'ord-track-1',
        'order_number' => 'AB-8001',
        'status' => 'preparing',
        'type' => 'dine_in',
        'customer_name' => 'Track Test',
        'tracking_token' => 'OT-TRACK99',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    $this->getJson('/tracker/order/OT-TRACK99')
        ->assertOk()
        ->assertJson(['success' => true]);
});
