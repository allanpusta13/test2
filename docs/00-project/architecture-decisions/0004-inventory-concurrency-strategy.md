# ADR-0004: Inventory Concurrency Strategy

**Date:** 2026-08-25  
**Status:** Accepted

## Context

The inventory system needs to handle simultaneous deductions from multiple kitchen staff or POS terminals. Two orders placed concurrently could each deduct the same ingredient, potentially overselling stock.

## Decision

We use **database-level atomicity** rather than application-level locking:

- Inventory deductions are individual `INSERT` rows in `inventory_transactions` (never mutations to `current_stock`).
- Stock is always derived via `SUM(quantity)` over all transactions for an item.
- Negative stock is prevented by a **validation check** in the controller that queries the current derived stock before inserting a new deduction transaction.
- For true concurrent execution, `pcntl_fork()` tests verify behavior on Unix systems. On Windows, the concurrency test is skipped but the validation test still proves the guard works.

### Why not application-level locks?

- Laravel's `DB::transaction` with `SELECT ... FOR UPDATE` would lock the row, but the system uses a ledger model (append-only transactions) rather than a mutable `current_stock` column.
- The ledger approach is inherently conflict-tolerant: two concurrent inserts don't corrupt each other. The only risk is overselling, which the pre-insert validation mitigates.
- This approach is simpler, requires no Redis/file-based locks, and works across SQLite (local) and PostgreSQL (production).

## Consequences

- **Positive:** No deadlocks, no lock contention, simple mental model (stock = SUM of transactions).
- **Negative:** A race condition between the validation check and the insert is theoretically possible under extreme concurrency. In practice, for a single-restaurant system with modest order volume, this is negligible.
- **Trade-off accepted:** We accept a tiny race window in exchange for zero infrastructure complexity (no Redis locks, no `SELECT FOR UPDATE`). If this ever becomes a problem, the fix is adding a database-level check constraint or a brief advisory lock around the insert.
