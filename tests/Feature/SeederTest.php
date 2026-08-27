<?php

declare(strict_types=1);

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('role seeder creates exactly 3 roles', function () {
    Artisan::call('db:seed', ['--class' => 'RoleSeeder']);

    expect(Role::count())->toBe(3);
});

test('permission seeder creates exactly 8 permissions', function () {
    Artisan::call('db:seed', ['--class' => 'PermissionSeeder']);

    expect(Permission::count())->toBe(8);
});

test('role permission seeder maps correct permissions per role', function () {
    Artisan::call('db:seed', ['--class' => 'RoleSeeder']);
    Artisan::call('db:seed', ['--class' => 'PermissionSeeder']);
    Artisan::call('db:seed', ['--class' => 'RolePermissionSeeder']);

    $admin = Role::where('name', 'admin')->first();
    $cashier = Role::where('name', 'cashier')->first();
    $kitchen = Role::where('name', 'kitchen_staff')->first();

    expect($admin->permissions->count())->toBe(8);
    expect($cashier->permissions->count())->toBe(4);
    expect($kitchen->permissions->count())->toBe(2);
});

test('database seeder runs without errors', function () {
    Artisan::call('db:seed');

    expect(Role::count())->toBe(3);
    expect(Permission::count())->toBe(8);
    expect(User::count())->toBeGreaterThanOrEqual(3);
});

test('seeding is idempotent - running twice does not duplicate data', function () {
    Artisan::call('db:seed');

    $roleCount = Role::count();
    $permCount = Permission::count();

    Artisan::call('db:seed');

    expect(Role::count())->toBe($roleCount);
    expect(Permission::count())->toBe($permCount);
});

test('all users have valid role_id foreign keys', function () {
    Artisan::call('db:seed');

    $usersWithNullRole = User::whereNull('role_id')->count();
    expect($usersWithNullRole)->toBe(0);

    $usersWithInvalidRole = User::whereNotIn('role_id', Role::pluck('id'))->count();
    expect($usersWithInvalidRole)->toBe(0);
});
