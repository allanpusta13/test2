<?php

declare(strict_types=1);

namespace App\Providers;

use App\Http\Controllers\BroadcastingController;
use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

/**
 * Replaces the default BroadcastingServiceProvider to use our custom
 * BroadcastingController that handles anonymous tracking token subscriptions.
 *
 * This provider registers the broadcasting auth route with our custom controller
 * and loads the channel authorization callbacks from routes/channels.php.
 */
final class CustomBroadcastServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // Register broadcasting auth route with our custom controller
        // that handles both staff (authenticated) and anonymous customer
        // (tracking token) subscriptions.
        Route::match(['get', 'post'], '/broadcasting/auth', [BroadcastingController::class, 'authenticate'])
            ->withoutMiddleware([PreventRequestForgery::class]);

        // Load channel authorization callbacks
        $channelsPath = base_path('routes/channels.php');
        if (file_exists($channelsPath)) {
            require $channelsPath;
        }
    }
}
