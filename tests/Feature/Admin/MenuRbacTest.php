<?php

declare(strict_types=1);

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::updateOrCreate(['name' => 'admin'], ['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    Role::updateOrCreate(['name' => 'cashier'], ['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    Role::updateOrCreate(['name' => 'kitchen_staff'], ['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);
});

test('admin can access menu index', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/menu')->assertOk();
});

test('cashier is denied from menu index', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/menu')->assertForbidden();
});

test('kitchen staff is denied from menu index', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/menu')->assertForbidden();
});

test('admin can access menu categories', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/menu/categories')->assertOk();
});

test('cashier is denied from menu categories', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/menu/categories')->assertForbidden();
});

test('admin can access menu items list', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/menu/items')->assertOk();
});

test('cashier is denied from creating a menu item', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->post('/menu/items', [
        'name' => 'Test Dish',
        'price' => 12.99,
        'category_id' => 'cat-test',
    ])->assertForbidden();
});
