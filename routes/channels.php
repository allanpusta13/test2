<?php

declare(strict_types=1);

use App\Models\Order;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The following channel authorization callbacks
| are used to check if an authenticated user can listen to the channel.
|
*/

// Single `orders` channel — any authenticated staff member with a valid role.
// No tenant scoping since this is a single-restaurant system.
Broadcast::channel('orders', function ($user) {
    return in_array($user->role, ['admin', 'cashier', 'kitchen_staff'], true);
});

Broadcast::channel('order.{trackingToken}', function ($user, $trackingToken) {
    return Order::where('tracking_token', mb_strtoupper($trackingToken))->exists();
});
