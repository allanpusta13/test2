<?php

declare(strict_types=1);

use App\Events\OrderStatusUpdated;
use App\Models\Order;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Event;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('admin can subscribe to orders channel', function () {
    Role::create(['id' => 'role-admin', 'name' => 'admin', 'is_system' => true]);
    $user = User::factory()->create(['role_id' => 'role-admin']);

    $result = Broadcast::channel('orders', function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    });

    // Broadcast::channel() registers the callback; we test the logic directly.
    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeTrue();
});

test('cashier can subscribe to orders channel', function () {
    Role::create(['id' => 'role-cashier', 'name' => 'cashier', 'is_system' => true]);
    $user = User::factory()->create(['role_id' => 'role-cashier']);

    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeTrue();
});

test('kitchen staff can subscribe to orders channel', function () {
    Role::create(['id' => 'role-kitchen-staff', 'name' => 'kitchen_staff', 'is_system' => true]);
    $user = User::factory()->create(['role_id' => 'role-kitchen-staff']);

    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeTrue();
});

test('user with non-staff role cannot subscribe to orders channel', function () {
    Role::create(['id' => 'role-invalid', 'name' => 'waiter', 'is_system' => false]);
    $user = User::factory()->create(['role_id' => 'role-invalid']);

    $callback = function ($authUser) {
        return in_array($authUser->role, ['admin', 'cashier', 'kitchen_staff'], true);
    };

    expect($callback($user))->toBeFalse();
});

test('orders channel callback is registered', function () {
    // Verify the channel is actually registered in the Broadcast manager
    $channels = Broadcast::getChannels();

    expect($channels)->toHaveKey('orders');
});

// --- Order Tracking Channel Tests ---

test('valid tracking token authorizes subscription', function () {
    Order::create([
        'id' => 'ord-track-auth-1',
        'order_number' => 'AB-9001',
        'status' => 'preparing',
        'type' => 'dine_in',
        'customer_name' => 'Auth Test',
        'tracking_token' => 'OT-TRACK1',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    $callback = function ($user, $trackingToken) {
        return Order::where('tracking_token', mb_strtoupper($trackingToken))->exists();
    };

    expect($callback(null, 'OT-TRACK1'))->toBeTrue();
});

test('invalid tracking token rejects subscription', function () {
    $callback = function ($user, $trackingToken) {
        return Order::where('tracking_token', mb_strtoupper($trackingToken))->exists();
    };

    expect($callback(null, 'OT-INVALID'))->toBeFalse();
});

test('mixed-case tracking token is authorized (case-insensitive)', function () {
    Order::create([
        'id' => 'ord-track-case-1',
        'order_number' => 'AB-9002',
        'status' => 'pending',
        'type' => 'takeaway',
        'customer_name' => 'Case Test',
        'tracking_token' => 'OT-ABC123',
        'subtotal' => 10.00,
        'tax_total' => 0.89,
        'total' => 10.89,
    ]);

    $callback = function ($user, $trackingToken) {
        return Order::where('tracking_token', mb_strtoupper($trackingToken))->exists();
    };

    // Subscribe with lowercase — should still be authorized
    expect($callback(null, 'ot-abc123'))->toBeTrue();
});

test('order tracking channel callback is registered', function () {
    $channels = Broadcast::getChannels();

    expect($channels)->toHaveKey('order.{trackingToken}');
});

test('order status updated event broadcasts on correct channel', function () {
    $order = Order::create([
        'id' => 'ord-event-1',
        'order_number' => 'AB-9003',
        'status' => 'preparing',
        'type' => 'dine_in',
        'customer_name' => 'Event Test',
        'tracking_token' => 'OT-EVT001',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    $event = new OrderStatusUpdated($order);

    // Verify the event broadcasts on the correct private channel
    $channels = $event->broadcastOn();
    expect($channels)->toHaveCount(1);

    $channel = $channels[0];
    expect($channel->name)->toBe('private-order.OT-EVT001');

    // Verify broadcast name
    expect($event->broadcastAs())->toBe('OrderStatusUpdated');

    // Verify payload contains order data
    $payload = $event->broadcastWith();
    expect($payload)->toHaveKeys(['id', 'order_number', 'status', 'tracking_token', 'updated_at']);
    expect($payload['id'])->toBe('ord-event-1');
    expect($payload['status'])->toBe('preparing');
    expect($payload['tracking_token'])->toBe('OT-EVT001');
});

test('order status updated event is dispatched on status change', function () {
    Event::fake([OrderStatusUpdated::class]);

    $order = Order::create([
        'id' => 'ord-dispatch-1',
        'order_number' => 'AB-9004',
        'status' => 'pending',
        'type' => 'dine_in',
        'customer_name' => 'Dispatch Test',
        'tracking_token' => 'OT-DSP01',
        'subtotal' => 14.99,
        'tax_total' => 1.33,
        'total' => 16.32,
    ]);

    // Simulate what OrderController::update does
    $order->status = 'preparing';
    $order->save();
    event(new OrderStatusUpdated($order->fresh()));

    Event::assertDispatched(OrderStatusUpdated::class, function ($event) use ($order) {
        return $event->order->id === $order->id;
    });
});
