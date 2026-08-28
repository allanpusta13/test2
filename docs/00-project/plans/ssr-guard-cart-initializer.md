# Plan: Guard localStorage Access in Cart Initializer for SSR Safety

## Problem
The cart `useState` initializer (line 289-298) reads `localStorage` during render. In SSR, tests, or private browsing modes where `localStorage` is unavailable/blocked, this can throw before React effects run, crashing the entire provider.

## Solution
Add `typeof window !== 'undefined'` guard before accessing `localStorage` in the cart initializer. If `window` is undefined (SSR) or `localStorage` is unavailable, return an empty array — same fallback the try/catch already provides.

## Files to Modify
- `resources/js/Context/RestaurantContext.tsx` — lines 289-298 (cart `useState` initializer) and lines 197-204 (auth user `useState` initializer, consistency fix).

## Expected Behavior
- In the browser: cart loads from `localStorage` as before (no behavior change).
- In SSR / test / private mode: cart initializes to `[]` without touching `localStorage` — no crash.
- The existing try/catch remains as a secondary safety net for other `localStorage` errors (quota, parse failure).

## Out of Scope
- Auth user initializer (line 197-204) — already has try/catch, separate task if needed.
- Debounced persistence `useEffect` — effects only run in the browser, no SSR risk.
- Other `localStorage` accesses in event handlers — only run in the browser.
