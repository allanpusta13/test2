<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

final class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        $adminPermissions = Permission::pluck('id')->toArray();

        $cashierPermissions = Permission::whereIn('name', [
            'orders.view',
            'orders.pos_create',
            'orders.payment_collect',
            'roles.view_matrix',
        ])->pluck('id')->toArray();

        $kitchenPermissions = Permission::whereIn('name', [
            'kitchen.kds_screen',
            'roles.view_matrix',
        ])->pluck('id')->toArray();

        $rolePermissions = [
            Role::ROLE_ADMIN => $adminPermissions,
            Role::ROLE_CASHIER => $cashierPermissions,
            Role::ROLE_KITCHEN_STAFF => $kitchenPermissions,
        ];

        DB::table('role_permission')->truncate();

        foreach ($rolePermissions as $roleName => $permissionIds) {
            $role = Role::where('name', $roleName)->first();
            if (! $role) {
                continue;
            }

            foreach ($permissionIds as $permissionId) {
                DB::table('role_permission')->updateOrInsert([
                    'role_id' => $role->id,
                    'permission_id' => $permissionId,
                ]);
            }
        }
    }
}
