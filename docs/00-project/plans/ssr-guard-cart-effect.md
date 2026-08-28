# Plan: Guard Cart Persistence Effect for SSR/Test Safety

## Problem
The cart persistence `useEffect` (lines 307-336) accesses `window`, `document`, and `localStorage` without guards. While `useEffect` doesn't run during SSR, it does run in test environments (jsdom) where `localStorage` may be unavailable or restricted, causing crashes.

## Solution
Add `if (typeof window === 'undefined') return;` at the top of the effect body. This matches the existing pattern in the cart initializer (line 291) and prevents any `window`/`document`/`localStorage` access in non-browser environments.

## Files to Modify
- `resources/js/Context/RestaurantContext.tsx` — add one guard line at the top of the cart persistence `useEffect` body (after line 307).

## Expected Behavior
- In the browser: no change — effect runs normally.
- In SSR/test/private-mode: effect returns early, no crashes.

## Council Summary
Reviewed by Architecture + Testing perspective. Approved. Notes: `flushPending`'s `localStorage.setItem` is already try/catch-protected; the `typeof window` guard is defense-in-depth and matches the initializer pattern. Cleanup function is safe to skip when returning early (no listeners/timers were registered).
- Other `useEffect` blocks in the file (offline detection, auto-sync, mount bootstrap) — separate task if needed.
- Changing the debounce logic or persistence behavior.
