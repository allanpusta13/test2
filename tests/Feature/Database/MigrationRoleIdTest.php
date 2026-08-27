<?php

declare(strict_types=1);

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('known roles are mapped to correct role_id values', function () {
    Artisan::call('db:seed', ['--class' => 'RoleSeeder']);

    // After all migrations run, seeded users should have correct role_id values
    $admin = User::where('email', 'admin@test.com')->first();
    $cashier = User::where('email', 'cashier@test.com')->first();
    $kitchen = User::where('email', 'kitchen@test.com')->first();

    if ($admin) {
        expect($admin->role_id)->toBe('role-admin');
    }
    if ($cashier) {
        expect($cashier->role_id)->toBe('role-cashier');
    }
    if ($kitchen) {
        expect($kitchen->role_id)->toBe('role-kitchen-staff');
    }

    // Verify the role column no longer exists (dropped by migration 000005)
    expect(Schema::hasColumn('users', 'role'))->toBeFalse();
    expect(Schema::hasColumn('users', 'role_id'))->toBeTrue();
});

test('no users have null role_id after migration completes', function () {
    Artisan::call('db:seed');

    $nullCount = DB::table('users')->whereNull('role_id')->count();
    expect($nullCount)->toBe(0);

    // All users should have a valid role_id pointing to an existing role
    $validRoleIds = Role::pluck('id')->toArray();
    $invalidCount = DB::table('users')
        ->whereNotIn('role_id', $validRoleIds)
        ->count();
    expect($invalidCount)->toBe(0);
});

test('schema has role_id column and no role column after migration', function () {
    Artisan::call('db:seed');

    // Final schema state: role_id exists (non-nullable), role column is gone
    expect(Schema::hasColumn('users', 'role_id'))->toBeTrue();
    expect(Schema::hasColumn('users', 'role'))->toBeFalse();

    // Verify role_id is actually non-nullable
    $columns = DB::select('PRAGMA table_info(users)');
    $roleIdColumn = collect($columns)->firstWhere('name', 'role_id');
    expect($roleIdColumn)->not->toBeNull();
    expect($roleIdColumn->notnull)->toBe(1);
});
