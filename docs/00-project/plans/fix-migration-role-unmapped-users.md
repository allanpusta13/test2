# Fix: Add Validation for Unmapped Users Before Dropping Role Column

## Goal
Prevent silent data loss in migration `000005` by aborting if any users have unmapped role values before dropping the `role` column. Consolidate with migration `000001` to remove redundant backfill logic.

## Problem
Migration `2026_08_24_000005_add_role_id_to_users_table.php` maps three known role names (`admin`, `cashier`, `kitchen_staff`) to `role_id` values, then immediately drops the `role` column. If any user has an unmapped role value (or `null`), their `role_id` remains `null` and the original value is permanently lost when the column is dropped. A separate migration `000001` later backfills NULLs with `role-cashier`, creating redundant/conflicting logic.

## Plan

### 1. Modify `database/migrations/2026_08_24_000005_add_role_id_to_users_table.php`
After the existing role mapping loop (lines 24-28), before `dropColumn`:
- Query for users where `role_id IS NULL`
- If any exist, `abort(500, "Migration aborted: {count} user(s) have unmapped roles and no role_id assigned. User IDs: {ids}. Resolve manually before migrating.")`
- Then proceed to drop the `role` column as before

### 2. Modify `database/migrations/2026_08_27_000001_make_role_id_non_nullable.php`
Remove the backfill logic (lines 14-17: `DB::table('users')->whereNull('role_id')->update(...)`). Keep only the non-nullable schema change. The abort in `000005` guarantees no NULLs reach this migration.

### 3. Add test `tests/Feature/Database/MigrationRoleIdTest.php`
Pest test with `RefreshDatabase`:
- **test_known_roles_are_mapped_correctly**: Seed roles via RoleSeeder, create users with each known role string, run migration, assert `role_id` is correct for each
- **test_migration_aborts_when_unmapped_users_exist**: Create a user with NULL `role_id`, run migration, expect abort with status 500
- **test_down_method_restores_role_column**: Run migration then rollback, verify `role` column exists and `role_id` column is dropped

## Files to Modify
1. `database/migrations/2026_08_24_000005_add_role_id_to_users_table.php` — add abort check
2. `database/migrations/2026_08_27_000001_make_role_id_non_nullable.php` — remove backfill
3. `tests/Feature/Database/MigrationRoleIdTest.php` — new test file

## Expected Behavior
- Users with known roles: mapped correctly (no change)
- Users with unknown/null `role_id`: migration aborts with clear error message
- `000001`: only makes column non-nullable, no data manipulation

## Out of Scope
- Changing the Role model, seeder, or User model
- Modifying any other migration
- Changing the application-level role-checking logic

## Council Summary
- **Architecture**: APPROVE — abort() is correct for fixed-roles system; consolidation eliminates redundancy
- **Security**: APPROVE — no silent privilege escalation; abort exposes unmapped users for manual resolution
- **Testing**: APPROVE — fail-loud approach is correct; test coverage is comprehensive (happy path, failure path, rollback)
- Notable feedback: All three reviewers initially DENY'd the original plan (silent assignment to cashier). Revised to use abort() and consolidate with `000001`. Security reviewer correctly identified that `kitchen_staff` is more restricted than `cashier`, but this is moot with abort().
