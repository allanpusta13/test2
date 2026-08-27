<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * Custom broadcasting auth controller that handles anonymous customers.
 *
 * For authenticated staff: delegates to default Broadcast::auth().
 * For anonymous customers: validates tracking token and authorizes the
 * subscription without requiring a real login.
 */
final class BroadcastingController extends Controller
{
    /**
     * Authenticate the request for channel access.
     *
     * Handles both staff (authenticated) and anonymous customer (tracking token) subscriptions.
     */
    public function authenticate(Request $request)
    {
        if ($request->hasSession()) {
            $request->session()->reflash();
        }

        $channelName = $request->input('channel_name', '');

        // For anonymous tracking channels, validate the token directly
        if (str_starts_with($channelName, 'private-order.')) {
            return $this->authorizeTrackingChannel($request, $channelName);
        }

        // For all other private channels (staff), require authentication
        return Broadcast::auth($request);
    }

    /**
     * Authorize an anonymous customer for a tracking channel.
     *
     * The channel name is `private-order.{trackingToken}`. We validate
     * that the token corresponds to a real order.
     */
    protected function authorizeTrackingChannel(Request $request, string $channelName): array
    {
        $trackingToken = str_replace('private-order.', '', $channelName);

        if (empty($trackingToken)) {
            throw new AccessDeniedHttpException('Invalid tracking channel.');
        }

        $order = Order::where('tracking_token', mb_strtoupper($trackingToken))->first();

        if (! $order) {
            throw new AccessDeniedHttpException('Invalid tracking token.');
        }

        // Return true to authorize — the channel callback in channels.php
        // performs the same validation as a defense-in-depth measure.
        return ['auth' => true];
    }
}
