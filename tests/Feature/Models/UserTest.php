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

test('getRoleAttribute returns role name when role_id is valid', function () {
    $user = User::factory()->create(['role_id' => 'role-admin']);

    expect($user->role)->toBe('admin');
});

test('getRoleAttribute returns null when role_id is null', function () {
    $user = new User();
    $user->role_id = null;

    expect($user->role)->toBeNull();
});

test('getRoleAttribute returns null when associatedRole is missing', function () {
    $user = new User();
    $user->role_id = 'role-nonexistent';

    expect($user->role)->toBeNull();
});

test('isAdmin returns false when role is null', function () {
    $user = new User();
    $user->role_id = null;

    expect($user->isAdmin())->toBeFalse();
});

test('isCashier returns false when role is null', function () {
    $user = new User();
    $user->role_id = null;

    expect($user->isCashier())->toBeFalse();
});

test('hasRole returns false when role is null', function () {
    $user = new User();
    $user->role_id = null;

    expect($user->hasRole('admin', 'cashier', 'kitchen_staff'))->toBeFalse();
});
