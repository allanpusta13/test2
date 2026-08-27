# ADR-0005: Offline Sync Strategy

**Date:** 2026-08-25  
**Status:** Accepted

## Context

The POS terminal needs to work offline for restaurant environments with unreliable connectivity. Orders placed offline must sync when connectivity returns without creating duplicates.

## Decision

We use **IndexedDB + idempotency keys** for offline-to-online sync:

### Architecture
1. **Service Worker** (`public/sw.js`) — caches static assets and API responses for offline access
2. **IndexedDB** (`resources/js/lib/offline-storage.ts`) — stores queued orders, menu cache, settings cache
3. **Offline Detection** — `navigator.onLine` + `online`/`offline` events in React context
4. **Sync on Reconnect** — when `isOffline` flips to `false`, iterate queued orders and POST each to `/order` with its idempotency key

### Sync Flow
```
Offline → Queue order in IndexedDB → Mark as 'queued'
Online  → Get all 'queued' orders → POST each with idempotency_key
          → Mark as 'synced' on success, 'failed' on error
          → Clear 'synced' orders from IndexedDB
```

### Double-Submission Prevention
- Every order has a client-generated `idempotency_key` (format: `client-idem-{timestamp}-{random}`)
- The backend `HomeController::store` checks for existing orders with the same `idempotency_key` before creating
- If a duplicate is detected, the existing order is returned instead of creating a new one
- This means even if the sync retries (e.g., network flaps), no duplicate orders are created

### Why IndexedDB over localStorage?
- **Structured data**: IndexedDB stores objects directly, no JSON serialization/deserialization
- **Larger capacity**: 50MB+ vs 5MB for localStorage
- **Async API**: Non-blocking, won't freeze the UI during large queue syncs
- **Transaction support**: Atomic operations prevent partial writes

### Why not a background sync API?
- `BackgroundSync` requires service worker registration and has limited browser support
- Our approach works in any browser with IndexedDB support
- The sync runs in the main thread when the app detects online status, which is simpler to debug and test

## Consequences

- **Positive**: Orders are never lost, even during extended offline periods. Idempotency keys guarantee no duplicates.
- **Negative**: IndexedDB operations are async, adding slight complexity to the offline queue management.
- **Trade-off accepted**: We accept the async complexity in exchange for reliable offline support without requiring a service worker background sync.
