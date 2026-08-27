<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);

    $category = Category::create([
        'id' => 'cat-pizza',
        'name' => 'Pizzas',
        'type' => 'menu',
        'icon' => 'Pizza',
        'sort_order' => 1,
        'is_active' => true,
    ]);

    MenuItem::create([
        'id' => 'item-margherita',
        'category_id' => 'cat-pizza',
        'name' => 'Margherita Pizza',
        'description' => 'Classic tomato, mozzarella, basil',
        'price' => 14.99,
        'image' => 'https://example.com/margherita.jpg',
        'is_available' => true,
    ]);
});

test('customer can browse menu and see items', function () {
    $this->get('/')->assertOk();
});

test('customer can place an order via API', function () {
    $response = $this->postJson('/order', [
        'customer_name' => 'Test Guest',
        'type' => 'dine_in',
        'table_number' => 'Table 3',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
        'idempotency_key' => 'idem-test-12345',
        'items' => [
            [
                'menu_item_id' => 'item-margherita',
                'name' => 'Margherita Pizza',
                'quantity' => 1,
                'unit_price' => 14.99,
                'total_price' => 14.99,
                'selected_modifiers' => [],
            ],
        ],
    ]);

    $response->assertStatus(201)
        ->assertJson(['success' => true]);

    $data = $response->json('data');
    expect($data['tracking_token'])->toStartWith('OT-');
    expect($data['status'])->toBe('pending');
    expect($data['customer_name'])->toBe('Test Guest');
});

test('idempotency key prevents duplicate orders', function () {
    $this->postJson('/order', [
        'customer_name' => 'Test Guest',
        'type' => 'takeaway',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
        'idempotency_key' => 'idem-duplicate-test',
        'items' => [
            [
                'menu_item_id' => 'item-margherita',
                'name' => 'Margherita Pizza',
                'quantity' => 1,
                'unit_price' => 14.99,
                'total_price' => 14.99,
            ],
        ],
    ])->assertStatus(201);

    $this->postJson('/order', [
        'customer_name' => 'Test Guest',
        'type' => 'takeaway',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
        'idempotency_key' => 'idem-duplicate-test',
        'items' => [
            [
                'menu_item_id' => 'item-margherita',
                'name' => 'Margherita Pizza',
                'quantity' => 1,
                'unit_price' => 14.99,
                'total_price' => 14.99,
            ],
        ],
    ])->assertOk();

    expect(Order::where('idempotency_key', 'idem-duplicate-test')->count())->toBe(1);
});

test('customer can track order by token', function () {
    Order::create([
        'id' => 'ord-track-test',
        'order_number' => 'AB-9999',
        'status' => 'preparing',
        'type' => 'dine_in',
        'table_number' => 'Table 1',
        'customer_name' => 'Track Test',
        'tracking_token' => 'OT-TRACK1',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    $this->getJson('/tracker/order/OT-TRACK1')
        ->assertOk()
        ->assertJson(['success' => true]);
});

test('invalid tracking token returns 404', function () {
    $this->getJson('/tracker/order/OT-NONEXISTENT')
        ->assertStatus(404);
});
