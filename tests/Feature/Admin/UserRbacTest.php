<?php

declare(strict_types=1);

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);
});

test('admin can access user management index', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);

    $this->actingAs($user)
        ->get('/users')
        ->assertOk();
});

test('admin can access roles matrix', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);

    $this->actingAs($user)
        ->get('/roles/matrix')
        ->assertOk();
});

test('cashier is denied from user management index', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);

    $this->actingAs($user)
        ->get('/users')
        ->assertForbidden();
});

test('kitchen staff is denied from user management index', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);

    $this->actingAs($user)
        ->get('/users')
        ->assertForbidden();
});

test('cashier is denied from roles matrix', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);

    $this->actingAs($user)
        ->get('/roles/matrix')
        ->assertForbidden();
});

test('kitchen staff is denied from roles matrix', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);

    $this->actingAs($user)
        ->get('/roles/matrix')
        ->assertForbidden();
});

test('cashier is denied from creating a user', function () {
    $user = User::factory()->create(['role_id' => 'role-cashier']);

    $this->actingAs($user)
        ->post('/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'role_id' => 'role-cashier',
        ])
        ->assertForbidden();
});

test('kitchen staff is denied from deleting a user', function () {
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);
    $target = User::factory()->create(['role_id' => 'role-cashier']);

    $this->actingAs($user)
        ->delete("/users/{$target->id}")
        ->assertForbidden();
});

test('admin cannot delete their own account', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);

    $this->actingAs($user)
        ->delete("/users/{$user->id}")
        ->assertStatus(422);
});
