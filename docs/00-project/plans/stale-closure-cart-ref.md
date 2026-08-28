# Plan: Fix Stale Closure in Cart Persistence Cleanup

## Problem
The `useEffect` cleanup calls `flushPending()` which closes over the `cart` value from when that effect instance was created. If cart changes rapidly, the cleanup writes an outdated snapshot instead of the latest state.

## Solution
Add a `cartRef` (`useRef<CartItem[]>`) that always tracks the latest `cart` value. Update it at the top of the effect body (`cartRef.current = cart`). Change `flushPending` to read from `cartRef.current` instead of the closure `cart`.

## Files to Modify
- `resources/js/Context/RestaurantContext.tsx` — add `cartRef` ref, update effect body.

## Expected Behavior
- `flushPending` always writes the latest cart value, even when called from cleanup.
- No behavior change in normal flow (the debounced timer already writes the correct value).
- Cleanup on unmount now correctly writes the final cart state.

## Out of Scope
- Other effects in the file.
- Changing the debounce interval or persistence strategy.
