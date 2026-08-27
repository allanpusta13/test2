<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

final class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            ['id' => 'perm-menu-manage', 'name' => 'menu.manage', 'description' => 'Create, update, delete dishes, prices, modifier groups, and BOM recipes', 'module' => 'Menu'],
            ['id' => 'perm-orders-view', 'name' => 'orders.view', 'description' => 'Browse current and past customer orders across the restaurant', 'module' => 'Orders & POS'],
            ['id' => 'perm-orders-pos-create', 'name' => 'orders.pos_create', 'description' => 'Use the fast POS terminal to take customer orders directly', 'module' => 'Orders & POS'],
            ['id' => 'perm-orders-payment-collect', 'name' => 'orders.payment_collect', 'description' => 'Tender cash payments, calculate change, and print ESC/POS receipts', 'module' => 'Orders & POS'],
            ['id' => 'perm-inventory-view-adjust', 'name' => 'inventory.view_and_adjust', 'description' => 'View derived stock levels, record restocks, log waste, and perform stock audits', 'module' => 'Inventory'],
            ['id' => 'perm-kitchen-kds', 'name' => 'kitchen.kds_screen', 'description' => 'View live tickets, bump orders to preparing (deducting BOM stock), and mark ready', 'module' => 'Kitchen'],
            ['id' => 'perm-users-manage', 'name' => 'users.manage', 'description' => 'View and manage restaurant staff user accounts with fixed system roles', 'module' => 'Users & Roles'],
            ['id' => 'perm-roles-view', 'name' => 'roles.view_matrix', 'description' => 'Inspect global immutable role-to-permission security rules', 'module' => 'Users & Roles'],
        ];

        foreach ($permissions as $permissionData) {
            Permission::updateOrCreate(
                ['name' => $permissionData['name']],
                $permissionData
            );
        }
    }
}
