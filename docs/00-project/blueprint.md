# Restaurant Ordering System — Blueprint v4 (Single-Restaurant, React + Inertia + shadcn)

**Multi-tenancy is deferred, not deleted.** This is now a single-restaurant system: one Admin Panel instead of a Super Admin / Tenant Panel split, no `tenant_id` anywhere, no subdomain routing, no cross-tenant isolation testing. Everything is structured so a tenancy layer could be reintroduced later (the schema has no tenant coupling baked deep into business logic, and the Admin Panel's role model already separates "admin" from "staff" cleanly) — but nothing is built for it now, and no code should anticipate it speculatively.

Payment model (cash-only, partial payments), inventory model (derived-sum stock, locked concurrent deduction), and offline POS resilience are unchanged from v2/v3 — this document covers what's different.

---

## 1. Core Features

### Customer Ordering Page (Public)
- The site root **is** the ordering page — no separate landing/marketing screen.
- Browse menu by category (items, prices, images, modifiers).
- Add items to cart, customize (size, extras, notes).
- Submit order → appears in the Admin Panel instantly.
- Order tracking via real-time status updates.
- Payment: cash at the counter only.

### Admin Panel (Restaurant Owner/Staff)
One panel, one restaurant, role-gated by the fixed/global roles below:
- **Menu Management** — CRUD categories, items, modifiers.
- **Order Management (POS)** — view incoming orders, change status (pending → preparing → ready → completed), record cash payment (including partial payments).
- **Inventory** — ingredient stock (derived from a transaction log), low-stock alerts, auto-deduction on order acceptance.
- **Reports** — daily sales, popular items, stock usage.
- **POS Terminal** — staff-entered walk-in orders, cash payment, receipt printing.
- **Kitchen Display** — real-time view of active orders for the kitchen.
- **User & Role Management** — create staff accounts, assign one of the fixed/global roles. No tenant management screen — there's only one restaurant.

### Roles (fixed, global, seeded — unchanged principle from v2/v3)
- `admin` — full access to the Admin Panel, including User & Role Management.
- `cashier` — Orders/POS, payments.
- `kitchen_staff` — Kitchen Display only (read-only order view, status updates).

No `super_admin` role and no tenant impersonation — both existed specifically to manage multiple tenants, which no longer applies. If multi-tenancy is reintroduced later, that's the point to bring `super_admin`/impersonation back too, not before.

---

## 2. System Architecture & Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | **Laravel 13** (PHP 8.3+/8.4) |
| Frontend Integration | **Inertia.js** |
| Frontend Framework | **React 19** |
| UI Components | **shadcn/ui** on Tailwind v4 |
| Real-time | Laravel Reverb + `laravel-echo`, single `orders` private channel (not tenant-scoped) |
| Database | Single PostgreSQL database, single schema — **no `tenant_id` anywhere** |
| Multi-tenancy | **Not implemented in this version.** No middleware, no scoping trait, no subdomain resolution. See "Deferred" note above. |
| Payment | Cash only, recorded by staff (unchanged) |
| Testing | Pest v4 (backend + browser), Vitest + React Testing Library (frontend components) |

---

## 3. Database Schema

```
users
  id, name, email, password, role_id

roles                              -- fixed & global, seeded once
  id, name (admin, cashier, kitchen_staff), is_system

permissions
  id, name (orders.manage, menu.edit, inventory.adjust, ...)

role_permission (pivot)
  role_id, permission_id

categories
  id, name, sort_order

menu_items
  id, category_id, name, description, price, image, is_available

modifiers / modifier_options
  id, name
  modifier_options: id, modifier_id, name, extra_price

orders
  id, order_number, status (pending, preparing, ready, completed, cancelled),
  type (dine_in, takeaway, delivery), table_number (nullable),
  customer_name, notes, idempotency_key (unique),
  subtotal, tax_total, total, amount_paid, payment_status (unpaid, partially_paid, paid, refunded),
  tracking_token, created_at, updated_at

order_items
  id, order_id, menu_item_id, quantity, unit_price, notes
  (modifiers via pivot: order_item_modifier)

tax_rates
  id, name, rate, is_inclusive, applies_to (all|category), category_id (nullable)

inventory_items
  id, name, unit, low_stock_threshold
  -- no stock column: stock is derived, unchanged from v2 §7

inventory_transactions
  id, inventory_item_id, quantity (signed), type (deduction, addition, adjustment),
  reference, created_at

menu_item_inventory (pivot)
  menu_item_id, inventory_item_id, quantity_used

payments
  id, order_id, amount, received_at, received_by (user_id), notes
```

**Removed from v3:** `tenants`, `impersonation_logs`, and every `tenant_id` column. Everything else — the fixed/global roles model, the derived-sum inventory model, the partial-payment logic — is structurally identical to v3, just without a tenant dimension.

---

## 4. Application Structure

### 4.1 Routing & Controllers

```php
// routes/web.php — public
Route::get('/', [PublicMenuController::class, 'index']);
Route::get('/cart', [PublicCartController::class, 'index']);
Route::get('/order/{order}', [OrderTrackingController::class, 'show']);

// routes/web.php — Admin Panel, role-gated, no tenant scope
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::middleware('role:admin,cashier')->group(function () {
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/pos', [PosController::class, 'index']);
    });
    Route::middleware('role:admin')->group(function () {
        Route::get('/menu', [MenuController::class, 'index']);
        Route::get('/inventory', [InventoryController::class, 'index']);
        Route::get('/users', [UserController::class, 'index']);
        Route::get('/roles', [RoleController::class, 'index']); // view/assign only
    });
    Route::middleware('role:admin,kitchen_staff')->group(function () {
        Route::get('/kitchen', [KitchenDisplayController::class, 'index']);
    });
});
```

No subdomain resolution, no `IdentifyTenant` middleware. Role-based route gating replaces tenant-based data scoping as the main access-control mechanism.

### 4.2 Frontend Structure

```
resources/js/
├── Pages/
│   ├── Admin/
│   │   ├── Orders/Index.tsx
│   │   ├── Pos/Index.tsx
│   │   ├── Menu/Index.tsx
│   │   ├── Inventory/Index.tsx
│   │   ├── Kitchen/Index.tsx
│   │   ├── Users/Index.tsx
│   │   └── Roles/Index.tsx        # view/assign only
│   └── Public/
│       ├── Menu.tsx
│       ├── Cart.tsx
│       └── OrderTracking.tsx
├── Layouts/
│   ├── AdminLayout.tsx             # replaces SuperAdminLayout + TenantLayout
│   └── PublicLayout.tsx
├── components/ui/                  # shadcn generated primitives
├── components/
└── lib/echo.ts                     # laravel-echo + Reverb, single `orders` channel
```

No `HandleInertiaRequests` tenant-sharing logic — `auth` (current user + role) is still shared, `tenant` is not, since there is none.

### 4.3 Roles/Permissions UI

`Roles/Index.tsx` remains view/assign only, same rationale as v3: roles are fixed, seeded data, and this page lets an admin assign one to a staff member without introducing tenant-style configurable permissions.

---

## 5. Customer Ordering Page

```php
Route::get('/', [PublicMenuController::class, 'index']);
```

No tenant subdomain, no `{tenant:slug}` route parameter — this is just the site root now. Cart, idempotent/rate-limited checkout, and "pay at counter" fulfilment are otherwise unchanged from v2/v3.

---

## 6. POS Workflow

Unchanged in mechanism from v2 §6 / v3 §4, minus tenant scoping:

- Walk-in and online order flows are the same.
- **Broadcast channels simplified**: a single `orders` private channel, authorized to any authenticated staff member with an appropriate role (not per-tenant, since there's only one restaurant). Customer order tracking still uses a signed `tracking_token` per order, since customers remain anonymous — that part is unchanged.
- Stock deduction still fires on the `preparing` transition (unchanged rule from v2 §6.4).

```php
// routes/channels.php
Broadcast::channel('orders', function ($user) {
    return in_array($user->role->name, ['admin', 'cashier', 'kitchen_staff']);
});

Broadcast::channel('order.{orderId}.tracking', function ($user, $orderId) {
    return Order::where('id', $orderId)
        ->where('tracking_token', request('token'))
        ->exists();
});
```

---

## 7. Inventory, Payments, Resilience

**Unchanged from v2/v3**, only with `tenant_id` dropped from every table/query:
- Stock as a derived `SUM(quantity)` over `inventory_transactions`, locked concurrent deduction (v2 §7).
- Cash-only payments with partial-payment support, `payment_status` derived from `SUM(payments.amount)` (v2 §8).
- Offline-first POS PWA, local print bridge (v2 §9).

---

## 8. Testing

**Cross-tenant isolation testing (v2/v3 §10) is removed entirely** — there's nothing to isolate with a single restaurant. It's replaced by a lighter but still important concern:

- **Role-based access control (RBAC) tests**: a `kitchen_staff` user cannot access `/admin/menu`, a `cashier` cannot access `/admin/users`, etc. — one test per route/role combination that should be denied, not just the happy path that should be allowed.
- Otherwise, testing conventions are unchanged: Pest backend + browser tests, Vitest for isolated React component logic, full suite (not just new tests) required before any task is done.

---

## 9. Implementation Order

1. **Project setup** — Laravel 13, Inertia, React 19, shadcn, Reverb, Pest, Vitest.
2. **Database migrations & models** — full schema from §3, seeders for fixed roles/permissions.
3. **Broadcast channel authorization** — the single `orders` channel + tracking-token channel from §6.
4. **Admin Panel — Users & Roles** — user management, view/assign roles UI.
5. **Admin Panel — Menu, Orders/POS, Inventory, Kitchen Display** — the core operational surfaces.
6. **Customer ordering page** — menu, cart, checkout, tracking.
7. **POS PWA & offline resilience.**
8. **Testing & deployment** — full RBAC test pass, order-flow end-to-end tests, inventory-concurrency tests, deployment setup (no wildcard SSL/subdomain config needed now — single domain).

---

## 10. Explicitly Out of Scope (For Now)

- **Multi-tenancy** — deferred, not rejected. If/when this becomes multi-restaurant again, expect to reintroduce: `tenants` table, `tenant_id` scoping, `IdentifyTenant` middleware, subdomain routing, `super_admin` role + impersonation, and the cross-tenant isolation test suite. None of the current schema or role model should make that migration harder than necessary, but none of it is being pre-built now either.
- Online/card payments and any gateway/webhook/PCI handling.
- Billing, subscription plans, feature flags.
- Custom, admin-authored roles or permissions beyond the fixed set.
- Global analytics beyond the Reports feature already in scope.