<?php

declare(strict_types=1);

namespace App\Models;

final class RolePermission
{
    public static function all(): array
    {
        return [
            [
                'id' => 'perm-1',
                'code' => 'menu.manage',
                'name' => 'Manage Menu & Modifiers',
                'description' => 'Create, update, delete dishes, prices, modifier groups, and BOM recipes',
                'module' => 'Menu',
                'allowed_roles' => ['admin'],
            ],
            [
                'id' => 'perm-2',
                'code' => 'orders.view',
                'name' => 'View Order Directory',
                'description' => 'Browse current and past customer orders across the restaurant',
                'module' => 'Orders & POS',
                'allowed_roles' => ['admin', 'cashier'],
            ],
            [
                'id' => 'perm-3',
                'code' => 'orders.pos_create',
                'name' => 'Create POS Walk-In Orders',
                'description' => 'Use the fast POS terminal to take customer orders directly',
                'module' => 'Orders & POS',
                'allowed_roles' => ['admin', 'cashier'],
            ],
            [
                'id' => 'perm-4',
                'code' => 'orders.payment_collect',
                'name' => 'Record Cash Payments',
                'description' => 'Tender cash payments, calculate change, and print ESC/POS receipts',
                'module' => 'Orders & POS',
                'allowed_roles' => ['admin', 'cashier'],
            ],
            [
                'id' => 'perm-5',
                'code' => 'inventory.view_and_adjust',
                'name' => 'Inventory Stock & Ledger',
                'description' => 'View derived stock levels, record restocks, log waste, and perform stock audits',
                'module' => 'Inventory',
                'allowed_roles' => ['admin'],
            ],
            [
                'id' => 'perm-6',
                'code' => 'kitchen.kds_screen',
                'name' => 'Kitchen Display System (KDS)',
                'description' => 'View live tickets, bump orders to preparing (deducting BOM stock), and mark ready',
                'module' => 'Kitchen',
                'allowed_roles' => ['admin', 'kitchen_staff'],
            ],
            [
                'id' => 'perm-7',
                'code' => 'users.manage',
                'name' => 'User Directory Management',
                'description' => 'View and manage restaurant staff user accounts with fixed system roles',
                'module' => 'Users & Roles',
                'allowed_roles' => ['admin'],
            ],
            [
                'id' => 'perm-8',
                'code' => 'roles.view_matrix',
                'name' => 'View Fixed System Roles Matrix',
                'description' => 'Inspect global immutable role-to-permission security rules',
                'module' => 'Users & Roles',
                'allowed_roles' => ['admin', 'cashier', 'kitchen_staff'],
            ],
        ];
    }

    public static function can(string $role, string $permissionCode): bool
    {
        if ($role === 'admin') {
            return true;
        }

        foreach (self::all() as $perm) {
            if ($perm['code'] === $permissionCode) {
                return in_array($role, $perm['allowed_roles'], true);
            }
        }

        return false;
    }
}
