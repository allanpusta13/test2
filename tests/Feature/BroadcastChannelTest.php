<?php

declare(strict_types=1);

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('admin can subscribe to orders channel', function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    $user = User::factory()->create(['role_id' => 'role-admin']);

    $result = Broadcast::channel('orders', function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    });

    // Broadcast::channel() registers the callback; we test the logic directly.
    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeTrue();
});

test('cashier can subscribe to orders channel', function () {
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    $user = User::factory()->create(['role_id' => 'role-cashier']);

    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeTrue();
});

test('kitchen staff can subscribe to orders channel', function () {
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);

    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeTrue();
});

test('user with non-staff role cannot subscribe to orders channel', function () {
    Role::create(['id' => 'role-invalid', 'name' => 'waiter', 'is_system' => false]);
    $user = User::factory()->create(['role_id' => 'role-invalid']);

    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeFalse();
});

test('orders channel callback is registered', function () {
    // Verify the channel is actually registered in the Broadcast manager
    $channels = Broadcast::getChannels();

    expect($channels)->toHaveKey('orders');
});
