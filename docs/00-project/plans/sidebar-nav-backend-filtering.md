# Sidebar Nav — Backend-Driven Role Filtering

## Plan
Move sidebar nav role-filtering from frontend to backend. `getSidebarNav(string $role)` accepts the user's role and returns only items that role can access. Frontend receives a pre-filtered list and renders it with zero role logic.

## Files Modified
1. `app/Services/RestaurantDataService.php` — `getSidebarNav()` accepts `$role` param, filters items server-side, strips `roles` key from output
2. `app/Http/Middleware/HandleInertiaRequests.php` — passes `$request->user()?->role` to `getSidebarNav()`
3. `resources/js/types/index.ts` — removed `roles` from `SidebarNavItem`
4. `resources/js/Layouts/AppLayout.tsx` — removed `.filter()` calls, renders `sidebarNav` directly

## Expected Behavior
- Admin sees all nav items
- Cashier sees POS, Orders, Roles only
- Kitchen staff sees Kitchen, Orders, Roles only
- Frontend has no role-based nav logic

## Council Summary
Reviewed by: Architecture. Approved. One flag about `getAllInitialData()` which turned out to be hallucinated — method doesn't exist. No denied verdicts.
