# Plan: 04 — Admin Panel: Users & Roles

## Déjà Vu
- ADR-0002 (`fixed-global-roles`) already settled that roles are seeded, fixed, never user-editable.
- Routes for `/admin/users`, `/admin/roles/matrix` already exist in `routes/web.php` (lines 68–155), gated to `admin` role via `role:admin` middleware.
- `UserController` already has full CRUD (index, list, create, store, show, edit, update, destroy).
- Frontend already has `AdminUsers.tsx`, `AdminRoles.tsx`, `AdminLayout.tsx` components.

## What Actually Needs to Change

### Problem
The `AdminUsers` component mutates local state only (context `setUsers`). Create/edit/delete operations don't persist to the database. The `api.ts` has `laravelApi.users.*` methods defined but the component doesn't use them.

### Scope (prompt 04 only — no menu/orders/inventory)
1. **Wire AdminUsers to backend API**: Replace context `setUsers` calls with `laravelApi.users.*` calls + `router.reload()` for persistence.
2. **Create Roles page**: `Pages/Admin/Roles/Index.tsx` — a dedicated Inertia page for the roles/permissions matrix (currently only rendered inside `AdminLayout` as a tab).
3. **RBAC tests**: Add Pest tests proving non-admin roles are denied from `/admin/users` and `/admin/roles/matrix`.

### Files to Modify
- `resources/js/Components/admin/AdminUsers.tsx` — replace local state mutations with API calls
- `resources/js/Pages/Admin/Users/Index.tsx` (new) — Inertia page wrapper
- `resources/js/Pages/Admin/Roles/Index.tsx` (new) — Inertia page for roles
- `routes/web.php` — add Inertia page routes for `/admin/users` and `/admin/roles` (currently only API routes exist)
- `app/Http/Controllers/Admin/UserController.php` — update `index()` to pass users/roles as Inertia props
- `tests/Feature/Admin/UserRbacTest.php` (new) — RBAC tests

### Security Hardening (from council review)
- Add self-delete guard in `UserController::destroy()`: abort 403 if `$id === auth()->id()`
- Escape LIKE wildcards (`%`, `_`) in the `search` parameter of `UserController::list()`

### Out of Scope
- Menu management (prompt 05)
- Orders/POS (prompt 05)
- Inventory (prompt 05)
- New roles or permission changes
- Modifying the existing `AppLayout.tsx` navigation (already works)

## Expected Behavior After
- Admin can create/edit/delete staff accounts via the UI, and changes persist to the database.
- Roles page shows the fixed roles and permissions matrix.
- Non-admin users (cashier, kitchen_staff) get 403 when accessing admin user management routes.
- Full test suite passes.
