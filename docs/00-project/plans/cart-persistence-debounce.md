# Plan: Debounce Cart localStorage Writes & Reduce Warn Spam

## Problem
`RestaurantContext.tsx:302-309` persists the full cart to `localStorage` on **every** `[cart]` state change via a `useEffect`. Rapid +/- quantity taps (common in POS use) trigger `updateCartItemQty` → `setCart` → effect → `JSON.stringify(cart)` + `localStorage.setItem()` per tap. If storage quota is exceeded, `console.warn` fires on every write attempt — potentially dozens of times per second.

## Solution

### 1. Debounce localStorage writes
Replace the synchronous `useEffect` with a **debounced** version using `useRef` + `setTimeout` (no external dependency). Batch writes to at most once every **300ms** of inactivity.

- Store the pending timeout ID in a `useRef<NodeJS.Timeout>`.
- On each `cart` change, clear any pending timeout and schedule a new one.
- On unmount, flush the pending timeout (write immediately) and clear it — no stale writes after unmount.

### 2. Reduce repeated warn logs
Add a module-level boolean `hasLoggedStorageError` (initialized to `false`). Only `console.warn` the first time; subsequent failures are silently swallowed or use `console.debug` if debugging is needed.

### 3. Flush on page hide / unmount
The cleanup function of the `useEffect` should call `clearTimeout` on the ref. Additionally, register `beforeunload` and `visibilitychange` listeners that flush the pending timeout immediately — this prevents data loss if the user closes the tab or switches apps within the debounce window.

## Files to Modify
- `resources/js/Context/RestaurantContext.tsx` — lines 302-309 only (the cart persistence `useEffect`).

## Council Feedback Addressed
Both Architecture and Testing/Ops reviewers flagged the same data-loss risk: user closes tab within the 300ms debounce window and the last write is lost. Addressed by adding `beforeunload` (tab close/refresh) and `visibilitychange` (tab/app switch) handlers that flush the pending timeout immediately.

## Expected Behavior
- Cart still persists to `localStorage` and loads on mount (no change in user-visible behavior).
- During rapid mutations (e.g., tapping +/- 10 times quickly), `localStorage.setItem` fires once ~300ms after the last tap, not 10 times.
- If `localStorage.setItem` fails (quota exceeded), a single `console.warn` fires per session, not per attempt.
- No new dependencies added.

## Out of Scope
- Changing the cart data structure or IndexedDB migration (covered by ADR-0005).
- Adding optimistic UI or other cart UX changes.
- Persisting other state (auth user, settings) — those are lower-frequency and don't need debouncing.
