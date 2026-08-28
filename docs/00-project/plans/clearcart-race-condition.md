# Plan: Fix clearCart Race Condition with Debounced Persistence

## Problem
`clearCart()` sets `cart` to `[]` via `setCart([])`, but the persistence effect's debounced write (300ms) may still fire with the old cart value from the effect cleanup closure, restoring deleted items on next load if the page reloads within 300ms.

## Solution
Make `clearCart` synchronously:
1. Clear the pending debounce timer via `cartPersistTimerRef.current`.
2. Remove the localStorage key directly (`localStorage.removeItem`).
3. Then call `setCart([])` as before.

This bypasses the debounce entirely for the clear case, which is the correct behavior — "clear" is a definitive action, not a mutation to be batched.

## Files to Modify
- `resources/js/Context/RestaurantContext.tsx` — update `clearCart` function (line 965).

## Expected Behavior
- `clearCart()` immediately removes cart from localStorage and clears any pending debounced write.
- No stale data can be restored on next page load after clearing.
- Other cart mutations (add/update/remove) still debounce normally.

## Council Summary
Reviewed by Architecture + Testing. Approved. Notes: surgical fix is correct — only bypasses debounce for the definitive "clear all" action. Ref access across scope is fine (refs are designed for this). SSR guard consistent with existing patterns.
- Adding/Removing individual items (the debounce is fine for those — the worst case is a stale add, not a data-loss scenario).
- Making the persistence effect synchronous for all mutations.
