# Fix: POS Cash Payment Role Check

## Finding
POS cash payment fails for ALL roles with "Only authorized Cashiers can tender cash at the counter." The frontend `isCashierOrAdmin` check always evaluates to `false`.

## Root Cause
The User model (`app/Models/User.php`) has a `getRoleAttribute()` accessor returning the role name string ('admin', 'cashier', 'kitchen_staff'), but this accessor is NOT included in serialization output (no `$appends = ['role']`). The frontend checks `currentUser.role === 'cashier'`, but `role` is `undefined` in the Inertia page props.

## Plan
Add `'role'` to the `$appends` array on the User model so the accessor is included in JSON serialization.

### Files to Modify
- `app/Models/User.php` — Add `protected $appends = ['role'];`

### Expected Behavior After Fix
- `auth.user.role` in Inertia props returns 'admin', 'cashier', or 'kitchen_staff'
- Frontend `isCashierOrAdmin` evaluates correctly
- POS cash payment works for admin and cashier roles

### Scope
- Only the User model serialization — no controller, middleware, or frontend changes needed
- This also fixes Finding #9 (cashier POS payment) since both use the same check

### Testing
- Run full Pest suite: `php artisan test`
- Run Vitest: `npm run test`
- Verify via Playwright: admin and cashier can complete POS cash payments
