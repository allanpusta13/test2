<?php

declare(strict_types=1);

use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\KitchenController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\PosController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\TrackerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes (Laravel 13 + Inertia - RESTful CRUD Controller Endpoints)
|--------------------------------------------------------------------------
*/

// Authentication & Staff Access Routes (Laravel Auth)
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'showLoginForm')->name('login');
    Route::post('/login', 'login')->name('login.post');
    Route::post('/logout', 'logout')->name('logout');
    Route::get('/auth/user', 'user')->name('auth.user');
    Route::get('/api/user', 'user')->name('api.user');
    Route::post('/auth/quick-login', 'quickLogin')->name('auth.quick-login');
    Route::get('/auth/demo-accounts', 'showLoginForm')->name('auth.demo-accounts');
});

// Public Customer Menu & Ordering Page (HomeController)
Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/api/bootstrap', 'bootstrap')->name('api.bootstrap');
    Route::get('/api/shared-payload', 'bootstrap')->name('api.shared-payload');
    Route::get('/list', 'list')->name('home.list');
    Route::get('/create', 'create')->name('home.create');
    Route::post('/store', 'store')->name('home.store');
    Route::post('/order', 'store')->name('home.order');
    Route::get('/show/{id}', 'show')->name('home.show');
    Route::get('/menu-dishes/{id}', 'show')->name('home.dish');
    Route::get('/menu-categories', 'categories')->name('home.categories');
});

// POS & Cash Register Terminal Page (PosController)
Route::prefix('pos')->controller(PosController::class)->name('pos.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/list', 'list')->name('list');
    Route::get('/create', 'create')->name('create');
    Route::post('/store', 'store')->name('store');
    Route::post('/orders', 'store')->name('orders.store');
    Route::get('/{id}', 'show')->name('show');
    Route::get('/{id}/edit', 'edit')->name('edit');
    Route::match(['put', 'patch'], '/{id}', 'update')->name('update');
    Route::delete('/{id}', 'destroy')->name('destroy');
    Route::post('/payments', 'recordPayment')->name('payments.store');
    Route::get('/receipt/{orderId}', 'printReceipt')->name('receipt');
});
Route::get('/pos', [PosController::class, 'index'])->name('pos');

// Kitchen Display System (KDS) Page (KitchenController)
Route::prefix('kitchen')->controller(KitchenController::class)->name('kitchen.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/list', 'list')->name('list');
    Route::get('/feed', 'list')->name('feed');
    Route::get('/{id}', 'show')->name('show');
    Route::get('/{id}/edit', 'edit')->name('edit');
    Route::match(['put', 'patch'], '/{id}', 'update')->name('update');
    Route::delete('/{id}', 'destroy')->name('destroy');
    Route::post('/orders/{id}/bump', 'bump')->name('bump');
    Route::patch('/orders/{id}/status', 'updateStatus')->name('status');
});
Route::get('/kitchen', [KitchenController::class, 'index'])->name('kitchen');

// Orders Directory & History Page (OrderController)
Route::prefix('orders')->controller(OrderController::class)->name('orders.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/list', 'list')->name('list');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::get('/{id}', 'show')->name('show');
    Route::get('/{id}/edit', 'edit')->name('edit');
    Route::match(['put', 'patch'], '/{id}', 'update')->name('update');
    Route::patch('/{id}/status', 'updateStatus')->name('update-status');
    Route::delete('/{id}', 'destroy')->name('destroy');
});
Route::get('/orders', [OrderController::class, 'index'])->name('orders');

// Menu & Catalog Management Page (MenuController)
Route::prefix('menu')->controller(MenuController::class)->name('menu.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/list', 'list')->name('list');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::get('/categories', 'categories')->name('categories');
    Route::post('/categories', 'storeCategory')->name('categories.store');
    Route::match(['put', 'patch'], '/categories/{id}', 'updateCategory')->name('categories.update');
    Route::delete('/categories/{id}', 'deleteCategory')->name('categories.delete');
    Route::post('/categories/reorder', 'reorderCategories')->name('categories.reorder');

    Route::get('/items', 'list')->name('items');
    Route::post('/items', 'store')->name('items.store');
    Route::get('/items/{id}', 'show')->name('items.show');
    Route::get('/items/{id}/edit', 'edit')->name('items.edit');
    Route::match(['put', 'patch'], '/items/{id}', 'update')->name('items.update');
    Route::delete('/items/{id}', 'destroy')->name('items.delete');
    Route::post('/items/{id}/toggle-availability', 'toggleAvailability')->name('items.toggle-availability');
});
Route::get('/menu', [MenuController::class, 'index'])->name('menu');

// Inventory Stock & Ledger Page (InventoryController)
Route::prefix('inventory')->controller(InventoryController::class)->name('inventory.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/list', 'list')->name('list');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::get('/items', 'list')->name('items');
    Route::post('/items', 'store')->name('items.store');
    Route::get('/items/{id}', 'show')->name('items.show');
    Route::get('/items/{id}/edit', 'edit')->name('items.edit');
    Route::match(['put', 'patch'], '/items/{id}', 'update')->name('items.update');
    Route::delete('/items/{id}', 'destroy')->name('items.delete');
    Route::get('/transactions', 'transactions')->name('transactions');
    Route::post('/transactions', 'recordTransaction')->name('transactions.store');
});
Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory');

// Live Order Tracker Page (TrackerController)
Route::controller(TrackerController::class)->name('tracker.')->group(function () {
    Route::get('/tracker/{token?}', 'index')->name('index');
    Route::get('/tracker/order/{token}', 'track')->name('lookup');
});
Route::get('/tracker/{token?}', [TrackerController::class, 'index'])->name('tracker');

// Staff Directory & Roles Page (UserController)
Route::prefix('users')->controller(UserController::class)->name('users.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/list', 'list')->name('list');
    Route::get('/create', 'create')->name('create');
    Route::post('/', 'store')->name('store');
    Route::get('/{id}', 'show')->name('show');
    Route::get('/{id}/edit', 'edit')->name('edit');
    Route::match(['put', 'patch'], '/{id}', 'update')->name('update');
    Route::delete('/{id}', 'destroy')->name('destroy');
});
Route::get('/users', [UserController::class, 'index'])->name('users');
Route::get('/roles/matrix', [UserController::class, 'rolesMatrix'])->name('roles.matrix');

// Store Settings (SettingsController)
Route::prefix('settings')->controller(SettingsController::class)->name('settings.')->group(function () {
    Route::get('/', 'show')->name('show');
    Route::match(['put', 'patch'], '/', 'update')->name('update');
});

// Localization & Language Switching (LocaleController)
Route::controller(LocaleController::class)->group(function () {
    Route::get('/locale/{locale}', 'setLocale')->name('locale.set');
    Route::post('/locale/{locale}', 'setLocale')->name('locale.update');
    Route::get('/translations/{locale?}', 'translations')->name('translations');
});
