# Refactor RestaurantDataService: Static Arrays → Database Queries

## Goal
Refactor `RestaurantDataService` so that methods returning hardcoded arrays (categories, menuItems, inventoryItems, transactions, orders, users, rolePermissions) instead query the Eloquent models. Keep `getSettings()`, `getRoutes()`, `getTranslations()`, `getSharedPayload()`, and `getSidebarNav()` unchanged.

## Tasks

### Task 1: Add `type` column to categories
- **Migration** (`2026_08_26_000001_add_type_to_categories_table.php`):
  - Add `type` string column (default `'menu'`) to `categories` table
- **Update Category model**: Add `'type'` to `$fillable`
- **Update CategorySeeder**: Set `'type' => $categoryData['type']` in `updateOrCreate`
- **Why**: The static data includes `type` ('menu' or 'ledger') that the frontend uses to filter categories. The DB currently has no `type` column.

### Task 2: Extract seed data to `SeedData` class
- **Create** `app/Services/SeedData.php`:
  - Static methods returning the raw seed arrays (copied from current `RestaurantDataService`)
  - Methods: `getCategories()`, `getMenuItems()`, `getInventoryItems()`, `getTransactions()`, `getOrders()`, `getUsers()`, `getRolePermissions()`
  - Preserves `created_at`/`updated_at` in order and transaction arrays
- **Update all seeders** to use `SeedData::getCategories()` etc. instead of `RestaurantDataService::getCategories()`
  - `CategorySeeder`, `MenuSeeder`, `InventorySeeder`, `OrderSeeder` — swap the import
  - `RoleSeeder`, `PermissionSeeder`, `RolePermissionSeeder`, `UserSeeder` — already self-contained, no change needed
- **Why**: Breaks the circular dependency — seeders use `SeedData`, service queries the DB.

### Task 3: Refactor service methods to query DB
Each method changes to:

| Method | Current | After |
|--------|---------|-------|
| `getCategories()` | Static array | `Category::all()->toArray()` |
| `getMenuItems()` | Static array | `MenuItem::all()->toArray()` (modifier_groups/recipe JSON auto-decoded) |
| `getInventoryItems()` | Static array | `InventoryItem::all()->toArray()` |
| `getTransactions()` | Static array | `InventoryTransaction::all()->toArray()` |
| `getOrders()` | Static array | `Order::with(['items', 'payments'])->get()->toArray()` |
| `getUsers()` | Static array | `User::with('associatedRole')->get()->toArray()` |
| `getRolePermissions()` | Static array | `Permission::with('roles')->get()->map(...)` — build `allowed_roles` from pivot, map `name → code` |

**Key mapping details:**
- `getRolePermissions()`: DB `Permission.name` stores the code (e.g., `'menu.manage'`). Map to `code` key. Build `allowed_roles` by collecting role names from the `roles` relationship.
- `getUsers()`: The `getRoleAttribute()` accessor on `User` provides the `role` string (e.g., `'admin'`). Eager loading `associatedRole` ensures no N+1.
- `getOrders()`: Eager load `items` and `payments`. The Order model's `$appends` (`amount_paid`, `payment_status`, `unpaid_balance`) will be included — this matches the static shape.

### Task 4: Update `getSharedPayload()`
- No changes needed — it already calls the service methods, which now query the DB
- Data over-sharing (all roles see all data) is pre-existing, not a regression

### Task 5: Preserve timestamps in seeders
- `InventorySeeder`: Pass `created_at` in `updateOrCreate` for transactions
- `OrderSeeder`: Pass `created_at`/`updated_at` for orders and payments
- `SeedData` arrays must include these timestamps

### Task 6: Add tests
- Shape-assertion test for `getSharedPayload()` keys
- `getRolePermissions()` mapping correctness test
- N+1 guard test for Order fetching (query count assertion)
- Extend seeder idempotency test to cover categories/menu/inventory

## Files to Create/Modify
- **Create**: `app/Services/SeedData.php`
- **Create**: `database/migrations/2026_08_26_000001_add_type_to_categories_table.php`
- **Modify**: `app/Services/RestaurantDataService.php` (7 methods refactored)
- **Modify**: `app/Models/Category.php` (add `type` to `$fillable`)
- **Modify**: `database/seeders/CategorySeeder.php` (use SeedData, set `type`)
- **Modify**: `database/seeders/MenuSeeder.php` (use SeedData)
- **Modify**: `database/seeders/InventorySeeder.php` (use SeedData, set timestamps)
- **Modify**: `database/seeders/OrderSeeder.php` (use SeedData, set timestamps)

## Expected Behavior After Change
- `php artisan migrate:fresh --seed` seeds all data correctly
- `getSharedPayload()` returns the same array structure as before
- Frontend receives identical data shape — no regressions
- Service methods query the DB instead of returning static arrays

## Scope Limitations
- Does NOT address data over-sharing in `getSharedPayload()` (pre-existing)
- Does NOT refactor `RolePermission` static class (dead code, not in scope)
- Does NOT add caching (single-restaurant, acceptable performance)
- Does NOT change `getSettings()`, `getRoutes()`, `getTranslations()`, `getSidebarNav()`

## Council Summary
- **Architecture**: APPROVE — flagged `getRolePermissions()` shape mismatch (human-readable `name` vs DB `name`), Category `$fillable` needs `type`, CategorySeeder must pass `type`. All addressed.
- **Testing**: APPROVE — required shape tests, permission mapping tests, N+1 guard, seeder idempotency. All included in Task 6.
- **Security**: APPROVE — data over-sharing is pre-existing, `RolePermission::can()` is dead code, no new concerns introduced.
