# ADR-0003: Single Broadcast Channel with Role Check

## Status
Accepted

## Context
The restaurant ordering system needs real-time updates for:
- Staff: order status changes, new incoming orders (Kitchen Display, Orders page)
- Customers: order tracking status (anonymous, via tracking token)

In a multi-tenant system, channels would be scoped per-tenant. This is a single-restaurant system with one set of staff.

## Decision
Use a single `orders` private channel for all staff communication, authorized by role check (admin, cashier, or kitchen_staff). No per-role channels, no per-tenant scoping.

Customer order tracking uses a public `order.{trackingToken}` channel. The tracking token is embedded in the channel name itself — it serves as the authorization mechanism. The token is a UUID-like value that is unguessable, so the channel is secure without Pusher-level auth. This avoids the Pusher protocol requirement that private channels must have an authenticated user (anonymous customers cannot authenticate).

## Consequences
- **Positive**: Simple channel architecture. One channel to manage, one authorization rule.
- **Positive**: All staff see all order updates — appropriate for a single-restaurant where coordination matters.
- **Positive**: No channel proliferation. Adding a new role doesn't require new channel configuration.
- **Positive**: Anonymous tracking works without authentication hacks or custom auth endpoints.
- **Negative**: A cashier sees kitchen status updates they don't need. Acceptable at single-restaurant scale — the overhead of filtering is not worth the complexity of multiple channels.
- **Negative**: All staff receive all broadcasts, which could be noisy. Mitigated by frontend filtering (components only react to relevant order statuses).
- **Negative**: Public tracking channel relies on token secrecy. Mitigated by UUID-like tokens that are unguessable.

## Alternatives Considered
1. **Per-role channels** (`orders.admin`, `orders.cashier`, `orders.kitchen`) — Rejected. Adds complexity for marginal benefit. At single-restaurant scale, all staff benefit from full visibility.
2. **Per-tenant channels** (`orders.{tenant}`) — Not applicable. Single restaurant, no tenants.
3. **Event-specific channels** (`orders.new`, `orders.status`) — Rejected. Channels are authorization boundaries, not event categories. Use Laravel events/broadcasting for event differentiation within the single channel.
4. **Private tracking channel with signed auth endpoint** — Rejected. The Pusher protocol requires private channels to have an authenticated user. Creating a fake auth endpoint or session for anonymous customers adds unnecessary complexity. A public channel with an unpredictable token name achieves the same security with less code.
