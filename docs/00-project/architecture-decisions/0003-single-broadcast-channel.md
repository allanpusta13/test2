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

Customer order tracking uses a private `order.{trackingToken}` channel. The tracking token is used to authorize the subscription via a broadcasting endpoint that validates the token against the orders table. This ensures that even if the token is leaked, the server must still authorize the subscription.

## Consequences
- **Positive**: Simple channel architecture. One channel to manage, one authorization rule.
- **Positive**: All staff see all order updates — appropriate for a single-restaurant where coordination matters.
- **Positive**: No channel proliferation. Adding a role doesn't require new channel configuration.
- **Positive**: Anonymous tracking works without authentication hacks or custom auth endpoints.
- **Negative**: A cashier sees kitchen status updates they don't need. Acceptable at single-restaurant scale — the overhead of filtering is not worth the complexity of multiple channels.
- **Negative**: All staff receive all broadcasts, which could be noisy. Mitigated by frontend filtering (components only react to relevant order statuses).
- **Negative**: Private tracking channel requires server-side authorization for each subscription. Mitigated by lightweight token validation in the broadcasting endpoint.

## Alternatives Considered
1. **Per-role channels** (`orders.admin`, `orders.cashier`, `orders.kitchen`) — Rejected. Adds complexity for marginal benefit. At single-restaurant scale, all staff benefit from full visibility.
2. **Per-tenant channels** (`orders.{tenant}`) — Not applicable. Single restaurant, no tenants.
3. **Event-specific channels** (`orders.new`, `orders.status`) — Rejected. Channels are authorization boundaries, not event categories. Use Laravel events/broadcasting for event differentiation within the single channel.
4. **Public tracking channel with token as channel name** — Rejected. Relies solely on token secrecy which is risky if tokens are leaked via logs, referrers, etc. The private channel approach adds a server-side authorization check.