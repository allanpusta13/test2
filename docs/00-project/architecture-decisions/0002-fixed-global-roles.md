# ADR-0002: Fixed/Global Roles

## Status
Accepted

## Context
The system needs role-based access control for staff users. In a multi-tenant system, tenants might need custom roles. This is a single-restaurant system, so that complexity is unnecessary.

## Decision
Roles are fixed, global, and seeded once. There are exactly three roles:
- `admin` — full access
- `cashier` — orders/POS/payments
- `kitchen_staff` — kitchen display only

Roles are stored in the `roles` table with `is_system = true`. The `is_system` flag prevents the application from allowing creation, modification, or deletion of these roles through the UI. Permissions are also seeded and linked via the `role_permission` pivot.

The `User` model stores a `role_id` foreign key pointing to the `roles` table.

## Consequences
- **Positive**: Simple, predictable access control. No need for a permission management UI.
- **Positive**: Role checks are O(1) — a single relationship load and string comparison.
- **Positive**: The `is_system` flag provides application-level protection against accidental role modification.
- **Negative**: Adding a new role requires a seeder deployment, not a UI action. Acceptable for a single-restaurant system where the owner is also the admin.
- **Negative**: The `RolePermission::can()` static method and the `role_permission` DB table can drift out of sync. A Pest test asserts they stay aligned.

## Alternatives Considered
1. **Configurable roles via UI** — Rejected. Adds complexity for a scenario (tenant-custom roles) that doesn't exist in this single-restaurant version.
2. **No DB tables, static-only** — Rejected. The DB tables enable the roles matrix UI and make the system extensible if multi-tenancy is reintroduced later.
