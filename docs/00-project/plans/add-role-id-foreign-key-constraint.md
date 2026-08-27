# Add FK Constraint: users.role_id → roles.id

## Finding
Migration `2026_08_24_000005` added `users.role_id` without a foreign key constraint, and migration `2026_08_27_000001` made it non-nullable but also didn't add the FK. This violates the accepted ADR-0002 ("The User model stores a role_id foreign key pointing to the roles table") and allows invalid `role_id` values at the DB level.

## Plan

### 1. Create `database/migrations/2026_08_27_000002_add_role_id_foreign_key_to_users_table.php`
- Add `$table->foreign('role_id')->references('id')->on('roles')->restrictOnDelete();`
- Down method: drop the foreign key constraint

### 2. Update `tests/TestCase.php` — seed roles before user creation
- `TestCase::setUp()` creates a default admin user via factory with `role_id = 'role-admin'`
- With the FK constraint, this requires roles to exist first
- Added `Role::updateOrCreate()` calls for all 3 roles before the factory call

### 3. Update test `beforeEach` blocks — idempotent role creation
- Changed `Role::create()` to `Role::updateOrCreate()` in 8 test files
- Prevents UNIQUE constraint violations when roles already exist from `TestCase::setUp()`
- Files: CustomerOrderingFlowTest, InventoryConcurrencyTest, MenuRbacTest, OrderLifecycleE2ETest, OrdersKitchenInventoryRbacTest, RbacAuditTest, UserRbacTest, UserTest

### 4. Update BroadcastChannelTest.php and AuthTest.php
- Same `create` → `updateOrCreate` change for roles created inside test methods

### Design Decisions
- **`restrictOnDelete()`**: Roles are fixed system data (`is_system = true`), never deleted through the app. `restrict` prevents accidental DB-level deletion and makes the invariant explicit.
- **Separate migration**: Column was added nullable in `000005`, made NOT NULL in `000001`. FK requires NOT NULL, so it couldn't live in either prior migration.
- **`updateOrCreate` in tests**: `TestCase::setUp()` runs before `beforeEach`, so roles seeded there would conflict with `Role::create()` in `beforeEach`. Using `updateOrCreate` makes all role creation idempotent.

## Expected Behavior After
- Any INSERT/UPDATE to `users.role_id` with a value not in `roles.id` fails at the DB level.
- No behavioral change for valid data — this is a defensive schema integrity fix.

## Out of Scope
- No changes to models, middleware, or controllers.
- Not re-litigating nullable vs. non-nullable (already settled in migration `000001`).

## Council Summary
- **Architecture**: APPROVED — completes what ADR-0002 mandates. Separate migration is necessary (FK requires NOT NULL column). `restrict()` is correct for fixed system roles.
- **Security**: APPROVED — closes a defense-in-depth gap. Prevents raw INSERTs or code bugs from placing arbitrary strings in `role_id`. No conflict with existing RBAC logic.
- **Testing**: APPROVED — `migrate:fresh --seed` is safe (roles seeded before users). Factory defaults to valid `role-cashier`. No migration ordering issues. Test changes required to make role creation idempotent with the new FK constraint.
