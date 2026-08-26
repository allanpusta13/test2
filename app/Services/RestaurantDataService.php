<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Category;
use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\MenuItem;
use App\Models\Order;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;

final class RestaurantDataService
{
    public static function getSettings(): array
    {
        return [
            'name' => 'The Artisan Wood-Fired Bistro',
            'tagline' => 'Authentic Handcrafted Pizzas, Slow-Simmered Pastas & Italian Classics',
            'address' => '452 Via Roma, Little Italy, NY 10013',
            'phone' => '+1 (555) 234-8901',
            'currency' => '$',
            'tax_rate' => 0.08875,
            'hours' => 'Daily: 11:30 AM – 10:30 PM',
            'cash_policy_notice' => 'Pay at Counter: Customers pay in person at the cashier counter. Only authorized cashiers can accept and record payments into the register.',
            'receipt_header' => "THE ARTISAN BISTRO\n452 Via Roma, Little Italy, NY\nTel: +1 (555) 234-8901",
            'receipt_footer' => "GRAZIE MILLE!\nThank you for dining with us.\nPlease retain this ticket for order collection.",
        ];
    }

    public static function getCategories(): array
    {
        return Category::all()->toArray();
    }

    public static function getMenuItems(): array
    {
        $items = MenuItem::all();

        return $items->map(function (MenuItem $item) {
            $data = $item->toArray();
            $data['modifier_groups'] = is_string($item->modifier_groups)
                ? json_decode($item->modifier_groups, true)
                : ($item->modifier_groups ?? []);
            $data['recipe'] = is_string($item->recipe)
                ? json_decode($item->recipe, true)
                : ($item->recipe ?? []);

            return $data;
        })->toArray();
    }

    public static function getInventoryItems(): array
    {
        return InventoryItem::all()->toArray();
    }

    public static function getTransactions(): array
    {
        return InventoryTransaction::all()->toArray();
    }

    public static function getOrders(): array
    {
        return Order::with(['items', 'payments'])->get()->toArray();
    }

    public static function getUsers(): array
    {
        return User::with('associatedRole')->get()->toArray();
    }

    public static function getRolePermissions(): array
    {
        $permissions = Permission::with('roles')->get();

        return $permissions->map(function (Permission $perm) {
            $allowedRoles = $perm->roles->pluck('name')->values()->all();

            return [
                'id' => $perm->id,
                'code' => $perm->name,
                'name' => $perm->description ?? $perm->name,
                'description' => $perm->description ?? '',
                'module' => $perm->module ?? '',
                'allowed_roles' => $allowedRoles,
            ];
        })->toArray();
    }

    public static function getRoutes(): array
    {
        return [
            'home' => '/',
            'pos' => '/pos',
            'kitchen' => '/kitchen',
            'orders' => '/orders',
            'menu' => '/menu',
            'inventory' => '/inventory',
            'tracker' => '/tracker',
            'users' => '/users',
            'nav_links' => [
                ['name' => 'app.nav.menu', 'url' => '/', 'icon' => 'BookOpen', 'surface' => 'public_menu'],
                ['name' => 'app.nav.track_order', 'url' => '/tracker', 'icon' => 'Search', 'surface' => 'public_tracker'],
                ['name' => 'app.nav.pos', 'url' => '/pos', 'icon' => 'LayoutGrid', 'surface' => 'admin', 'tab' => 'pos', 'role' => 'cashier'],
                ['name' => 'app.nav.kitchen', 'url' => '/kitchen', 'icon' => 'ChefHat', 'surface' => 'admin', 'tab' => 'kitchen', 'role' => 'kitchen_staff'],
                ['name' => 'app.nav.orders', 'url' => '/orders', 'icon' => 'Receipt', 'surface' => 'admin', 'tab' => 'orders', 'role' => 'cashier'],
                ['name' => 'app.nav.menu_mgmt', 'url' => '/menu', 'icon' => 'Utensils', 'surface' => 'admin', 'tab' => 'menu', 'role' => 'admin'],
                ['name' => 'app.nav.inventory', 'url' => '/inventory', 'icon' => 'Boxes', 'surface' => 'admin', 'tab' => 'inventory', 'role' => 'admin'],
                ['name' => 'app.nav.staff', 'url' => '/users', 'icon' => 'Users', 'surface' => 'admin', 'tab' => 'users', 'role' => 'admin'],
            ],
        ];
    }

    public static function getTranslations(?string $locale = null): array
    {
        $locale = $locale ?? App::getLocale() ?? 'en';
        $path = base_path("lang/{$locale}");

        if (! File::isDirectory($path)) {
            $path = base_path('lang/en');
        }

        $translations = [];
        $files = File::files($path);

        foreach ($files as $file) {
            $name = $file->getFilenameWithoutExtension();
            $translations[$name] = require $file->getPathname();
        }

        return $translations;
    }

    public static function getSharedPayload(?string $locale = null): array
    {
        $locale = $locale ?? App::getLocale() ?? 'en';

        return [
            'locale' => $locale,
            'locales' => [
                'en' => 'English (US)',
                'it' => 'Italiano (IT)',
            ],
            'translations' => self::getTranslations($locale),
            'routes' => self::getRoutes(),
            'settings' => self::getSettings(),
            'categories' => self::getCategories(),
            'menuItems' => self::getMenuItems(),
            'inventory' => self::getInventoryItems(),
            'transactions' => self::getTransactions(),
            'orders' => self::getOrders(),
            'users' => self::getUsers(),
            'rolesPermissions' => self::getRolePermissions(),
        ];
    }

    /**
     * Sidebar navigation structure — single source of truth for admin nav.
     * Filters items server-side by the given role; the frontend renders whatever it receives.
     */
    public static function getSidebarNav(string $role = 'admin'): array
    {
        $allGroups = [
            [
                'label' => 'Operations & Service',
                'items' => [
                    [
                        'id' => 'pos',
                        'title' => 'POS Terminal',
                        'icon' => 'Calculator',
                        'route' => '/pos',
                        'roles' => ['admin', 'cashier'],
                        'badge' => 'Cash Only',
                        'badgeVariant' => 'amber',
                    ],
                    [
                        'id' => 'orders',
                        'title' => 'Orders & Register',
                        'icon' => 'ReceiptText',
                        'route' => '/orders',
                        'roles' => ['admin', 'cashier', 'kitchen_staff'],
                        'count' => 'activeOrders',
                        'badgeVariant' => 'default',
                    ],
                    [
                        'id' => 'kitchen',
                        'title' => 'Kitchen KDS',
                        'icon' => 'ChefHat',
                        'route' => '/kitchen',
                        'roles' => ['admin', 'kitchen_staff'],
                        'count' => 'pendingPrep',
                        'badgeVariant' => 'dynamic-amber',
                    ],
                ],
            ],
            [
                'label' => 'Inventory & Catalog',
                'items' => [
                    [
                        'id' => 'menu',
                        'title' => 'Menu & Recipes',
                        'icon' => 'UtensilsCrossed',
                        'route' => '/menu',
                        'roles' => ['admin'],
                        'count' => 'menuItems',
                        'badgeVariant' => 'default',
                    ],
                    [
                        'id' => 'inventory',
                        'title' => 'Derived Ledger',
                        'icon' => 'Boxes',
                        'route' => '/inventory',
                        'roles' => ['admin'],
                        'count' => 'lowStock',
                        'badgeVariant' => 'dynamic-red',
                    ],
                ],
            ],
            [
                'label' => 'Staff & Governance',
                'items' => [
                    [
                        'id' => 'users',
                        'title' => 'Staff Directory',
                        'icon' => 'Users',
                        'route' => '/users',
                        'roles' => ['admin'],
                        'count' => 'users',
                        'badgeVariant' => 'default',
                    ],
                    [
                        'id' => 'roles',
                        'title' => 'RBAC Permissions',
                        'icon' => 'ShieldCheck',
                        'route' => '/users',
                        'roles' => ['admin', 'cashier', 'kitchen_staff'],
                        'badge' => 'Matrix',
                        'badgeVariant' => 'outline',
                    ],
                ],
            ],
        ];

        return collect($allGroups)
            ->map(function ($group) use ($role) {
                $filteredItems = array_values(array_filter($group['items'], function ($item) use ($role) {
                    return in_array($role, $item['roles'], true);
                }));

                return [
                    'label' => $group['label'],
                    'items' => collect($filteredItems)->map(function ($item) {
                        unset($item['roles']);

                        return $item;
                    })->values()->all(),
                ];
            })
            ->filter(fn ($group) => count($group['items']) > 0)
            ->values()
            ->all();
    }
}
