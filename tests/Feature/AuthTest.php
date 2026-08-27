<?php

declare(strict_types=1);

use App\Models\User;

test('auth status returns current session info for guest', function () {
    // Clear the default authenticated user from TestCase
    $this->app['auth']->forgetGuards();

    $response = $this->getJson('/auth/user');

    $response->assertOk()
        ->assertJson([
            'authenticated' => false,
            'user' => null,
        ]);
});

test('user can authenticate via login endpoint', function () {
    App\Models\Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    App\Models\Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);

    $user = User::factory()->create([
        'email' => 'testuser@artisanbistro.com',
        'password' => bcrypt('password123'),
        'role_id' => 'role-admin',
    ]);

    $response = $this->postJson('/login', [
        'email' => 'testuser@artisanbistro.com',
        'password' => 'password123',
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'role' => User::ROLE_ADMIN,
        ]);

    $this->assertAuthenticatedAs($user);
});

test('user can quick login by role', function () {
    App\Models\Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);

    $cashier = User::factory()->create([
        'email' => 'cashier@artisanbistro.com',
        'role_id' => 'role-cashier',
    ]);

    $response = $this->postJson('/auth/quick-login', [
        'role' => User::ROLE_CASHIER,
        'email' => 'cashier@artisanbistro.com',
    ]);

    $response->assertOk()
        ->assertJson([
            'success' => true,
            'role' => User::ROLE_CASHIER,
        ]);

    $this->assertAuthenticatedAs($cashier);
});

test('user can logout', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->postJson('/logout')
        ->assertOk()
        ->assertJson([
            'success' => true,
        ]);

    $this->assertGuest();
});
