# Plan: Harden Customer Tracking Broadcasting

## Task
Replace public `order.{trackingToken}` channel with signed/private authorization and update ADR/tests accordingly.

## Status
Approved (Council: Architecture, Security, Testing — all approved with conditions addressed)

## Context
The customer order tracking uses a private `order.{trackingToken}` channel for real-time updates. The channel definition (`channels.php`) and frontend (`Echo.private(...)`) are already in place, but:
1. No `OrderStatusUpdated` broadcast event exists — frontend listens but nothing dispatches
2. No `/broadcasting/auth` endpoint — `Broadcast::routes()` not registered
3. No tests for `order.{trackingToken}` channel authorization
4. Anonymous customers can't use private channels without an auth mechanism

## Design Decisions

### Anonymous Auth Mechanism
Private channels require Laravel's `/broadcasting/auth` endpoint. Anonymous customers have no credentials. Solution:
- Register `Broadcast::routes()` with custom middleware (`EnsureAnonymousSession`) that creates a session-only anonymous user when no authenticated user exists
- Custom `BroadcastingController` validates tracking tokens against the session
- This lets anonymous customers subscribe through Laravel's standard auth flow

### Dispatch Location
Dispatch `OrderStatusUpdated` from the two controller methods that change status:
- `KitchenController::update()` and `KitchenController::bump()`
- `OrderController::update()`

Not from a model observer — explicit dispatch at the controller level is clearer and avoids hidden side effects.

### Staff Channel Gap (Out of Scope)
The `orders` staff channel also has no broadcasting. This is a separate concern — this task focuses only on the customer tracking channel.

## Files to Create/Modify

| File | Action |
|------|--------|
| `app/Events/OrderStatusUpdated.php` | **Create** — `ShouldBroadcast`, broadcasts on `order.{token}` private channel |
| `app/Http/Controllers/BroadcastingController.php` | **Create** — custom auth endpoint validating tracking tokens |
| `app/Http/Middleware/EnsureAnonymousSession.php` | **Create** — creates session-only anonymous user for unauthenticated visitors |
| `app/Http/Controllers/Admin/KitchenController.php` | **Modify** — dispatch `OrderStatusUpdated` after status changes in `update()` and `bump()` |
| `app/Http/Controllers/Admin/OrderController.php` | **Modify** — dispatch `OrderStatusUpdated` after status change in `update()` |
| `routes/web.php` | **Modify** — register `Broadcast::routes()` with anonymous middleware |
| `tests/Feature/BroadcastChannelTest.php` | **Modify** — add `order.{trackingToken}` channel tests |
| `routes/channels.php` | **Commit** — already correct, just untracked |

## Expected Behavior
1. Anonymous customers visiting the tracker page get a session with an anonymous user
2. Echo subscribes to `order.{token}` private channel → auth endpoint validates token against session
3. Channel authorization callback validates token against orders table
4. When order status changes, `OrderStatusUpdated` is broadcast on the private channel
5. Customers receive real-time updates
6. Invalid tokens are rejected

## Test Coverage
- Valid tracking token → subscription authorized
- Invalid tracking token → subscription rejected
- Mixed-case valid token → authorized (case-insensitive)
- `order.{trackingToken}` channel callback is registered
- `OrderStatusUpdated` event broadcasts on correct channel with correct payload

## What This Does NOT Cover
- Staff `orders` channel broadcasting (separate task)
- Frontend changes (already correct — `Echo.private(...)` and listener in place)
- WebSocket infrastructure (Reverb already installed, BROADCAST_CONNECTION=log in dev)
