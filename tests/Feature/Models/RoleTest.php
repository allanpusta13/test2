<?php

declare(strict_types=1);

use App\Models\Permission;
use App\Models\Role;

test('role model uses string primary key', function () {
    $role = Role::factory()->create();

    expect($role->id)->toBeString();
    expect($role->incrementing)->toBeFalse();
    expect($role->getKeyType())->toBe('string');
});

test('role has many permissions', function () {
    $role = Role::factory()->create();
    $permission1 = Permission::factory()->create();
    $permission2 = Permission::factory()->create();

    $role->permissions()->attach([$permission1->id, $permission2->id]);

    expect($role->permissions)->toHaveCount(2);
    expect($role->permissions->pluck('id')->toArray())->toContain($permission1->id, $permission2->id);
});

test('permission belongs to many roles', function () {
    $permission = Permission::factory()->create();
    $role1 = Role::factory()->create();
    $role2 = Role::factory()->create();

    $permission->roles()->attach([$role1->id, $role2->id]);

    expect($permission->roles)->toHaveCount(2);
});

test('role is_system defaults to true in database', function () {
    $role = Role::create(['id' => 'role-test', 'name' => 'test_role']);
    $role->refresh();

    expect($role->is_system)->toBeTrue();
});

test('role has correct fillable attributes', function () {
    $role = new Role();

    expect($role->getFillable())->toContain('id', 'name', 'is_system');
});

test('permission model uses string primary key', function () {
    $permission = Permission::factory()->create();

    expect($permission->id)->toBeString();
    expect($permission->incrementing)->toBeFalse();
    expect($permission->getKeyType())->toBe('string');
});

test('permission has correct fillable attributes', function () {
    $permission = new Permission();

    expect($permission->getFillable())->toContain('id', 'name', 'description', 'module');
});

test('role permission pivot has cascade deletes', function () {
    $role = Role::factory()->create();
    $permission = Permission::factory()->create();
    $role->permissions()->attach($permission->id);

    expect($role->permissions)->toHaveCount(1);

    $role->delete();

    expect(Permission::find($permission->id))->not->toBeNull();
    expect(DB::table('role_permission')->where('role_id', $role->id)->count())->toBe(0);
});
