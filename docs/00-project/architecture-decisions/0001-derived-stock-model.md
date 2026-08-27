# ADR-0001: Derived Stock Model

## Status
Accepted

## Context
The restaurant ordering system needs to track ingredient inventory. A naive approach stores a `current_stock` column directly on `inventory_items` and decrements it when orders are placed. However, this loses audit history and makes it impossible to answer "what happened to the stock?" after the fact.

## Decision
Stock is always derived via `SUM(quantity)` over `inventory_transactions`. The `inventory_items` table has no `stock` or `current_stock` column. Each transaction records a signed quantity:
- **Positive**: restock, addition, audit increase
- **Negative**: prep_deduction, waste, audit decrease, cancellation_reversal

The `derived_stock` accessor on `InventoryItem` computes the current level at query time.

## Consequences
- **Positive**: Complete audit trail. Every stock change is a row in `inventory_transactions`. Easy to explain stock discrepancies.
- **Positive**: Concurrent-safe with row-level locking on deduction (SELECT ... FOR UPDATE during the `preparing` transition).
- **Negative**: Slightly more expensive reads (SUM query vs. direct column read). Acceptable for a single-restaurant scale.
- **Negative**: Cannot naively set stock to a value — must go through a transaction of type `audit_adjustment`.

## Alternatives Considered
1. **Cached `current_stock` column** — Rejected. Adds a synchronization bug window and loses audit history.
2. **Event-sourcing with replay** — Overkill for this scale. The transaction log IS the event store, but we don't need full event sourcing infrastructure.
