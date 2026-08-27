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

test('admin can access orders index', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/orders')->assertOk();
});

test('cashier can access orders index', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/orders')->assertOk();
});

test('kitchen staff is denied from orders index', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/orders')->assertForbidden();
});

test('admin can access kitchen index', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/kitchen')->assertOk();
});

test('kitchen staff can access kitchen index', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/kitchen')->assertOk();
});

test('cashier is denied from kitchen index', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/kitchen')->assertForbidden();
});

test('admin can access inventory index', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/inventory')->assertOk();
});

test('cashier is denied from inventory index', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/inventory')->assertForbidden();
});

test('kitchen staff is denied from inventory index', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/inventory')->assertForbidden();
});

test('admin can access pos index', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);
    $this->actingAs($user)->get('/pos')->assertOk();
});

test('cashier can access pos index', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);
    $this->actingAs($user)->get('/pos')->assertOk();
});

test('kitchen staff is denied from pos index', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $this->actingAs($user)->get('/pos')->assertForbidden();
});
