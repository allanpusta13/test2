# 02 — Database Migrations & Models

## Goal
Build out the full single-restaurant schema from the blueprint and the corresponding Eloquent models.

## Tasks

### 1. Roles, Permissions, & Role-Permission Pivot
- **Migration** (`2026_08_24_000001_create_roles_permissions_tables.php`):
  - `roles`: id (string PK), name (unique), is_system (boolean, default true), timestamps
  - `permissions`: id (string PK), name (unique), description (text, nullable), module (string, nullable), timestamps
  - `role_permission`: role_id (FK→roles, cascade), permission_id (FK→permissions, cascade), composite unique index
- **Models**: `Role` (belongsToMany Permission, guarded is_system), `Permission` (belongsToMany Role)
- **Seeder**: 3 roles (admin, cashier, kitchen_staff), 8 permissions, pivot mapping

### 2. Modifiers & Modifier Options
- **Migration** (`2026_08_24_000002_create_modifiers_tables.php`):
  - `modifiers`: id (string PK), name, timestamps
  - `modifier_options`: id (string PK), modifier_id (FK), name, extra_price (decimal), timestamps
- **Models**: `Modifier` (hasMany ModifierOption), `ModifierOption` (belongsTo Modifier)

### 3. Tax Rates
- **Migration** (`2026_08_24_000003_create_tax_rates_table.php`):
  - `tax_rates`: id (string PK), name, rate (decimal), is_inclusive (boolean), applies_to (string, default 'all'), category_id (nullable FK→categories), timestamps
- **Model**: `TaxRate` (belongsTo Category when category_id set)

### 4. Menu-Item-Inventory Pivot
- **Migration** (`2026_08_24_000004_create_menu_item_inventory_table.php`):
  - `menu_item_inventory`: menu_item_id (FK→menu_items, cascade), inventory_item_id (FK→inventory_items, cascade), quantity_used (decimal), composite PK
- **Model relationships**: MenuItem belongsToMany InventoryItem, InventoryItem belongsToMany MenuItem

### 5. Users role_id FK Migration
- **Migration** (`2026_08_24_000005_add_role_id_to_users_table.php`):
  - Add `role_id` (string, nullable) column to users
  - Data migration: map string role names to role IDs
  - Drop old `role` column
- **User model update**: Add `belongsTo(Role::class)`, update role-check methods

### 6. Role Middleware
- Create `app/Http/Middleware/CheckRole.php`
- Register in `bootstrap/app.php`
- Update routes/web.php with role middleware per blueprint §4.1

### 7. ADRs
- `0001-derived-stock-model.md` — why inventory_transactions is source of truth
- `0002-fixed-global-roles.md` — why roles are seeded, not configurable

### 8. Factories & Tests
- Factories for Role, Permission, Modifier, ModifierOption, TaxRate
- Tests: model relationships, seeder correctness, string PK conventions, idempotent seeding

## Verification
- `php artisan test` — full suite passes
- `php artisan migrate:fresh --seed` — seeders run without errors
- ADRs written, CLAUDE.md verified accurate

## Council Summary
Architecture: DENY → revised to include users.role_id FK and role middleware in same task
Testing: DENY → revised to specify DatabaseSeeder ordering, string PK strategy, composite unique index
Security: APPROVE → incorporated composite unique index, FK cascades, mass-assignment guard
