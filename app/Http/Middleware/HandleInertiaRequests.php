<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Services\RestaurantDataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = $request->get('locale') ?? Session::get('locale') ?? config('app.locale', 'en');
        if (! in_array($locale, ['en', 'it'], true)) {
            $locale = 'en';
        }
        App::setLocale($locale);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'locale' => $locale,
            'locales' => [
                'en' => 'English (US)',
                'it' => 'Italiano (IT)',
            ],
            'translations' => RestaurantDataService::getTranslations($locale),
            'routes' => RestaurantDataService::getRoutes(),
            'settings' => RestaurantDataService::getSettings(),
            'categories' => RestaurantDataService::getCategories(),
            'menuItems' => RestaurantDataService::getMenuItems(),
            'inventory' => RestaurantDataService::getInventoryItems(),
            'transactions' => RestaurantDataService::getTransactions(),
            'orders' => RestaurantDataService::getOrders(),
            'users' => RestaurantDataService::getUsers(),
            'rolesPermissions' => RestaurantDataService::getRolePermissions(),
            'sidebarNav' => RestaurantDataService::getSidebarNav($request->user()?->role ?? 'cashier'),
        ]);
    }
}
