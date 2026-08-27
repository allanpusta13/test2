<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\InventoryItem;
use App\Models\MenuItem;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);

    Category::create(['id' => 'cat-test', 'name' => 'Test', 'type' => 'menu', 'sort_order' => 1, 'is_active' => true]);
    MenuItem::create(['id' => 'item-test', 'category_id' => 'cat-test', 'name' => 'Test Item', 'price' => 10.00, 'is_available' => true]);
    InventoryItem::create(['id' => 'inv-test', 'name' => 'Test Ingredient', 'category' => 'Dry Goods', 'unit' => 'kg', 'unit_cost' => 1.00, 'current_stock' => 10.0, 'par_level' => 50.0, 'reorder_point' => 20.0]);
});

// Settings routes — admin only
test('admin can access settings', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/settings')->assertOk();
});

test('cashier is denied from settings', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/settings')->assertForbidden();
});

test('kitchen staff is denied from settings', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/settings')->assertForbidden();
});

// Menu — kitchen_staff denied from all menu routes
test('kitchen staff is denied from creating a menu item', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->post('/menu/items', [
        'name' => 'New Dish',
        'price' => 15.00,
        'category_id' => 'cat-test',
    ])->assertForbidden();
});

test('kitchen staff is denied from menu categories', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/menu/categories')->assertForbidden();
});

// Inventory — cashier/kitchen_staff denied from write operations
test('cashier is denied from creating inventory transaction', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->post('/inventory/transactions', [
        'inventory_item_id' => 'inv-test',
        'quantity' => 5,
        'type' => 'restock',
        'reference' => 'Test',
    ])->assertForbidden();
});

test('kitchen staff is denied from creating inventory item', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->post('/inventory/items', [
        'name' => 'New Ingredient',
        'category' => 'Produce',
        'unit' => 'kg',
        'unit_cost' => 2.00,
        'current_stock' => 0,
        'par_level' => 10,
        'reorder_point' => 5,
    ])->assertForbidden();
});

// Kitchen — cashier denied from status updates
test('cashier is denied from bumping kitchen order', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->post('/kitchen/orders/ord-test/bump')->assertForbidden();
});

test('cashier is denied from updating kitchen order status', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->patch('/kitchen/orders/ord-test/status', [
        'status' => 'preparing',
    ])->assertForbidden();
});

// Orders — kitchen_staff denied from order management
test('kitchen staff is denied from creating an order', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->post('/orders', [
        'customer_name' => 'Test',
        'type' => 'dine_in',
        'subtotal' => 10.00,
        'tax_total' => 0.89,
        'total' => 10.89,
        'items' => [],
    ])->assertForbidden();
});

// POS — kitchen_staff denied from payment recording
test('kitchen staff is denied from recording payment', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->post('/pos/payments', [
        'order_id' => 'ord-test',
        'amount' => 10.00,
        'tendered' => 10.00,
    ])->assertForbidden();
});

// Unauthenticated access — admin-only routes require auth
test('unauthenticated user cannot access admin-only routes', function () {
    $this->get('/users')->assertDontSee('User Management');
    $this->get('/settings')->assertDontSee('Settings');
});
