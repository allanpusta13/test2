<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

final class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['id' => 'role-admin', 'name' => Role::ROLE_ADMIN, 'is_system' => true],
            ['id' => 'role-cashier', 'name' => Role::ROLE_CASHIER, 'is_system' => true],
            ['id' => 'role-kitchen-staff', 'name' => Role::ROLE_KITCHEN_STAFF, 'is_system' => true],
        ];

        foreach ($roles as $roleData) {
            Role::updateOrCreate(
                ['name' => $roleData['name']],
                $roleData
            );
        }
    }
}
