# Multi-Tenant Restaurant SaaS — Blueprint

A Laravel/Filament SaaS platform for restaurants: a public ordering page per restaurant, a Tenant Panel that doubles as POS + inventory + reports, and a Super Admin panel scoped to tenant/user/role administration.

---

## 1. Core Features

### Customer Ordering Page (Public)
- The root URL for a tenant *is* the ordering page — no separate landing/marketing screen.
- Browse menu by category (items, prices, images, modifiers).
- Add items to cart, customize (size, extras, notes).
- Submit order → appears in the restaurant's POS instantly.
- Order tracking via real-time status updates.
- Payment: **cash at the counter only** — no online payment in this phase.

### Tenant Panel (Restaurant Owner/Staff)
- **Menu Management** — CRUD categories, items, modifiers.
- **Order Management (POS)** — view incoming orders, change status (pending → preparing → ready → completed), record cash payment.
- **Inventory** — ingredient stock (derived from a transaction log), low-stock alerts, auto-deduction on order acceptance.
- **Reports** — daily sales, popular items, stock usage.
- **POS Terminal** — staff-entered walk-in orders, cash payment, receipt printing.
- **Kitchen Display** — real-time view of active orders for the kitchen.
- **Table/QR ordering** (optional) — per-table QR code linking to a pre-filled ordering page.

### Super Admin Panel
- Scoped to exactly three things: **Tenants, Users, Roles/Permissions.**
- No billing, no subscription plans, no feature flags, no global order oversight, no system-wide settings — those stay per-tenant or are explicitly out of scope for this build.
- Can impersonate a tenant panel, with a mandatory audit trail.

---

## 2. System Architecture & Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | **Laravel 13** (PHP 8.3+ required) |
| Admin Panels | **Filament 5.x** (requires Livewire 4 + Tailwind v4) |
| Customer UI | **Livewire 4** + Alpine.js, plain Blade layout outside Filament |
| Real-time | Laravel Reverb, tenant-scoped private/presence channels |
| Database | **Single PostgreSQL database, single schema** — no per-tenant databases, ever |
| Multi-tenancy | `tenant_id` on every tenant-scoped table, resolved via custom middleware + Filament's native tenant support — no third-party tenancy package |
| Payment | **Cash only**, recorded by staff in the Tenant Panel |
| Receipt Printing | Local print bridge (networked ESC/POS endpoint), not browser-triggered |

The POS, inventory, and reporting are not separate systems — the Tenant Panel *is* the back-of-house application. The customer ordering page feeds orders directly into it.

---

## 3. Multi-Tenancy

### 3.1 Tenant Resolution

Single database, shared schema, resolved per-request from the subdomain:

```php
// app/Http/Middleware/IdentifyTenant.php
class IdentifyTenant
{
    public function handle($request, Closure $next)
    {
        $subdomain = explode('.', $request->getHost())[0];
        $tenant = Tenant::where('slug', $subdomain)->firstOrFail();

        app()->instance('currentTenant', $tenant);
        Config::set('app.current_tenant_id', $tenant->id);

        return $next($request);
    }
}
```

Every tenant-scoped model uses a `BelongsToTenant` trait that applies a global scope automatically — this is the primary defense against cross-tenant data leakage and must exist before any resource is built. The Filament Tenant Panel uses Filament's native `HasTenants` support on the `User` model, resolved from the same middleware, so admin-panel and public-storefront tenant resolution stay consistent.

### 3.2 Database Schema

```
tenants
  id, name, slug, domain, logo, address, phone, is_active

users
  id, name, email, password, role_id, tenant_id (nullable — null for super admins)

roles                              -- fixed & global, seeded once, not tenant-editable
  id, name (super_admin, tenant_admin, cashier, kitchen_staff, ...), is_system

permissions                        -- fixed & global
  id, name (orders.manage, menu.edit, inventory.adjust, ...)

role_permission (pivot)
  role_id, permission_id

categories
  id, tenant_id, name, sort_order

menu_items
  id, tenant_id, category_id, name, description, price, image, is_available

modifiers / modifier_options
  id, tenant_id, name
  modifier_options: id, modifier_id, name, extra_price

orders
  id, tenant_id, order_number, status (pending, preparing, ready, completed, cancelled),
  type (dine_in, takeaway, delivery), table_number (nullable),
  customer_name, notes, idempotency_key (unique per tenant),
  subtotal, tax_total, total, amount_paid, payment_status (unpaid, partially_paid, paid, refunded),
  created_at, updated_at

order_items
  id, order_id, menu_item_id, quantity, unit_price, notes
  (modifiers via pivot: order_item_modifier)

tax_rates
  id, tenant_id, name, rate, is_inclusive, applies_to (all|category), category_id (nullable)

inventory_items
  id, tenant_id, name, unit, low_stock_threshold
  -- no stock column: stock is derived, see §7

inventory_transactions        -- source of truth for stock
  id, tenant_id, inventory_item_id, quantity (signed), type (deduction, addition, adjustment),
  reference, created_at

menu_item_inventory (pivot)
  menu_item_id, inventory_item_id, quantity_used

payments                       -- cash only
  id, order_id, tenant_id, amount, received_at, received_by (user_id), notes

impersonation_logs
  id, super_admin_id, tenant_id, reason, started_at, ended_at
```

**Roles and permissions are fixed, global, seeded data** — created once via migration/seeder. A tenant assigns the existing roles to their staff but cannot create new roles or edit what a role can do. This keeps the permission model simple and identical across every tenant.

**Tax** is modeled per-tenant via `tax_rates` rather than a flat column, so each tenant can represent multiple rates, inclusive vs. exclusive pricing, and category-specific tax (e.g., alcohol vs. food).

---

## 4. Filament Panels — Two Fully Separate Dashboards

Super Admin and Tenant Panel share no UI shell. A staff member never sees both, and the only link between them is the audited impersonation flow.

### 4.1 Super Admin Panel

- URL: `admin.yourapp.com`
- **`TenantResource`** — create/edit tenants (name, slug, domain, logo, address, phone, `is_active` to suspend).
- **`UserResource`** — create/edit users across all tenants; assign tenant + role.
- **`RoleResource`** — read/assign view only. Roles and permissions are seeded, not authored here — no create/delete actions for roles themselves.
- Tenant impersonation via Filament's tenant switch, gated by §4.2.

### 4.2 Impersonation Audit Log

Every impersonation requires a `reason` before it's permitted, and logs `super_admin_id`, `tenant_id`, `reason`, `started_at`, `ended_at`. The Tenant Panel shows an active-impersonation banner whenever a Super Admin is viewing on a tenant's behalf.

### 4.3 Tenant Panel

- URL: `{tenant}.yourapp.com/tenant`
- Resources: Category, MenuItem, Modifier, Order, InventoryItem.
- Custom pages: POS Terminal (Livewire component for walk-ins), Kitchen Display (read-only grid of active orders), Reports.
- Staff roles (`tenant_admin`, `cashier`, `kitchen_staff`, ...) come from the same fixed/global `roles` table but are scoped so staff only ever see their own tenant's data.

---

## 5. Customer Ordering Page

### 5.1 Routing

```php
Route::domain('{tenant:slug}.' . config('app.domain'))->group(function () {
    Route::get('/', MenuPage::class);          // the ordering page IS the welcome page
    Route::get('/cart', CartPage::class);
    Route::get('/order/{order}', OrderTracking::class);
});
```

No CMS, no per-tenant marketing content — the surface is intentionally just the ordering flow.

### 5.2 Menu & Cart

- Categories as tabs; each item has an "Add to Cart" action with a modifier-selection popup.
- Cart stored in session, keyed `cart_{tenant->id}`.

### 5.3 Checkout

- Customer enters name, order type (dine-in/takeaway), optional table number, notes.
- Fulfilment note is fixed as **"Pay at counter"** — there's no payment-method choice to build.
- Submission is idempotent and rate-limited:

```php
public function submitOrder()
{
    $this->validate();

    $idempotencyKey = $this->idempotencyKey ??= (string) Str::uuid();

    $existing = Order::where('tenant_id', $tenant->id)
        ->where('idempotency_key', $idempotencyKey)
        ->first();

    if ($existing) {
        return redirect()->route('order.track', $existing);
    }

    RateLimiter::attempt(
        "order-submit:{$tenant->id}:{$request->ip()}",
        $perMinute = 5,
        fn () => Order::create([...])
    );
}
```

Apply Laravel's throttle middleware to the checkout route as a second layer.

---

## 6. POS Workflow

### 6.1 Walk-in Orders

1. Staff opens POS Terminal, selects "New Order."
2. Adds items/modifiers/quantities, optional table number.
3. Places order → `type = dine_in`, status `pending` or `preparing`.
4. Staff records cash payment (§8) → order marked `paid`.
5. Receipt printed via the local print bridge (§9.2).

### 6.2 Online Orders

1. Orders appear in the same Orders table with status `pending`.
2. Staff accepts → status `preparing`; this is the point stock is deducted (§7.2) and Kitchen Display updates in real time.
3. Staff marks `ready` when food is done → customer tracking page updates.
4. Customer pays at counter on pickup; staff records payment and marks `completed`.

### 6.3 Real-Time Channel Authorization

```php
// routes/channels.php
Broadcast::channel('tenant.{tenantId}.orders', function ($user, $tenantId) {
    return $user->tenant_id === (int) $tenantId;
});

Broadcast::channel('order.{orderId}.tracking', function ($user, $orderId) {
    // Public tracking: authorize via a signed token in the URL, not a login
    return Order::where('id', $orderId)
        ->where('tracking_token', request('token'))
        ->exists();
});
```

Tenant Panel and Kitchen Display subscribe to the tenant-scoped **private** channel. Customer order tracking uses a signed tracking token embedded in the URL, since customers are anonymous — this prevents leaking order events to anyone guessing a sequential order ID.

### 6.4 Inventory Deduction Timing

**Stock is deducted on transition to `preparing`** — the point ingredients are actually committed. A `pending` order that's rejected never touches stock. If an order is cancelled after reaching `preparing`, the deduction is reversed with a compensating `inventory_transactions` row (`type = addition`) rather than mutating the original entry.

---

## 7. Inventory Management

### 7.1 Stock as a Derived Sum

Stock is **not** a stored, mutable column — it's the sum of an append-only transaction log, so the log and the balance can never drift out of sync:

```php
// InventoryItem model
public function currentStock(): int
{
    return $this->transactions()->sum('quantity');
}
```

For high-traffic dashboards, an optional `cached_stock` column can be maintained via an observer — but it's a read-optimization only, always rebuildable from `inventory_transactions`, and never written to directly.

### 7.2 Concurrency-Safe Deduction

```php
DB::transaction(function () use ($order) {
    foreach ($order->items as $item) {
        foreach ($item->menuItem->inventoryItems as $ingredient) {
            $locked = InventoryItem::where('id', $ingredient->id)->lockForUpdate()->first();

            $used = $ingredient->pivot->quantity_used * $item->quantity;
            $available = $locked->transactions()->sum('quantity');

            if ($available < $used) {
                throw new InsufficientStockException($ingredient, $used);
            }

            InventoryTransaction::create([
                'inventory_item_id' => $locked->id,
                'tenant_id' => $order->tenant_id,
                'type' => 'deduction',
                'quantity' => -$used,
                'reference' => "Order #{$order->order_number}",
            ]);

            if (($available - $used) <= $locked->low_stock_threshold) {
                // fire low-stock notification
            }
        }
    }
});
```

`lockForUpdate()` on `InventoryItem` serializes concurrent orders against the same ingredient, so two simultaneous orders can't both succeed past the same limited stock.

---

## 8. Payments

Cash only, recorded by staff at the point of sale — no gateway, no webhooks, no card handling anywhere in the system. Since cash orders can be paid across multiple installments (e.g. a customer pays part now, the rest on pickup), each payment is its own row and `orders.payment_status` is derived from the running total rather than flipped directly:

```php
class RecordCashPayment
{
    public function __invoke(Order $order, float $amountReceived, User $staff)
    {
        DB::transaction(function () use ($order, $amountReceived, $staff) {
            Payment::create([
                'order_id' => $order->id,
                'tenant_id' => $order->tenant_id,
                'amount' => $amountReceived,
                'received_at' => now(),
                'received_by' => $staff->id,
            ]);

            $totalPaid = $order->payments()->sum('amount');

            $order->update([
                'amount_paid' => $totalPaid,
                'payment_status' => match (true) {
                    $totalPaid <= 0 => 'unpaid',
                    $totalPaid < $order->total => 'partially_paid',
                    default => 'paid',
                },
            ]);
        });
    }
}
```

- `payment_status` is one of `unpaid` / `partially_paid` / `paid` / `refunded`, always derived from `SUM(payments.amount)` against `orders.total` rather than set directly — this keeps it consistent even if a staff member records payments in several passes.
- The Tenant Panel Orders view should surface the outstanding balance (`total - amount_paid`) directly on `partially_paid` orders, so staff know how much is still owed at pickup.
- A refund is a manual staff action requiring the same permission as accepting payment, logged with a note; refunding a `partially_paid` order only reverses what was actually collected.
- The `payments` schema leaves room for a `method` column later without a breaking migration, but no logic beyond cash is built now.

---

## 9. Resilience & Physical Operations

### 9.1 Offline-First POS

A physical restaurant losing order-taking ability during a wifi drop is a product-killing failure, not an edge case:

- Build the POS Terminal as a **PWA** with a service worker and local-first storage (e.g., IndexedDB), separate from the server-rendered Filament back-office pages (Menu, Inventory, Reports).
- Orders created offline queue locally with the same client-generated idempotency key pattern as §5.3, syncing when connectivity returns.
- Menu/price data is cached locally and refreshed on reconnect.

### 9.2 Receipt Printing

Browser-triggered ESC/POS printing is fragile across restaurant hardware. Use a small local print bridge — a lightweight local daemon or networked ESC/POS printer with a REST endpoint — that the POS PWA calls directly on the local network, rather than routing print jobs through the main web request cycle.

---

## 10. Cross-Tenant Isolation Testing

The highest-value test investment for a single-DB multi-tenant app:

1. **Scope test** — for every tenant-scoped model, create two tenants' data and assert querying as Tenant A never returns Tenant B's rows, across Resources, Livewire components, and any API endpoints.
2. **Broadcast channel test** — assert Tenant A's staff cannot subscribe to Tenant B's private order channel.
3. **Direct-ID access test** — for every route accepting a model ID, assert requesting another tenant's record returns 403/404.
4. Run this suite on every PR touching a tenant-scoped model or route — a regression here is a data-breach-class bug, not a UX bug.

---

## 11. Implementation Order

1. **Project setup** — Laravel 13 (PHP 8.3+), Filament 5.x, Tailwind v4, Reverb, queue driver.
2. **Multi-tenancy foundation** — `IdentifyTenant` middleware, `BelongsToTenant` trait/global scope, Filament `HasTenants`. Write the cross-tenant isolation suite (§10) at this stage, before resources exist.
3. **Database migrations & models** — including `roles`/`permissions` seeders, `tax_rates`, `inventory_transactions`, `impersonation_logs`.
4. **Broadcast channel authorization (§6.3)** — before any UI depends on real-time updates.
5. **Super Admin Panel** — `TenantResource`, `UserResource`, `RoleResource` (view/assign only), impersonation flow with audit logging.
6. **Tenant Panel resources** — Category, MenuItem, Modifier, Order (deduction-timing rule from §6.4 baked into the status-transition action), InventoryItem (locked deduction from §7.2).
7. **Customer ordering page** — menu browsing at the tenant root, cart, idempotent checkout, cash-only fulfilment.
8. **POS PWA** — offline-first front-end (§9.1), local print bridge (§9.2).
9. **Testing & deployment** — cross-tenant isolation suite, order-flow tests, inventory-concurrency tests, wildcard SSL + dynamic subdomains.

---

## 12. Explicitly Out of Scope (For Now)

These were considered and deliberately deferred, not overlooked — worth revisiting only as real, validated needs:

- Online/card payments (Stripe or otherwise) and any associated webhook/PCI handling.
- Tenant-level billing, subscription plans, or feature flags.
- Tenant-authored custom roles or permissions — the fixed/global set is intentional.
- Global cross-tenant analytics or reporting in the Super Admin panel.
- Per-tenant database isolation — single database is a hard requirement, not a starting point to migrate away from.