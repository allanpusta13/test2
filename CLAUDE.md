# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. It's a living document — the initial build is complete, so this now reflects the shipped system rather than an in-progress one. Update it whenever a real convention changes, via the `plan-council-code-test` skill's own instruction to do so. Keep it accurate rather than exhaustive; stale sections are worse than short ones.

## Project Overview

Single-restaurant ordering + POS system. Laravel backend with **Inertia.js + React + shadcn/ui**. Key versions: PHP 8.4, Laravel v13, Inertia.js, React 19, Tailwind CSS v4, Pest v4, Vitest.

**Multi-tenancy is deferred, not deleted.** This is a single-restaurant system: one Admin Panel, no `tenant_id` anywhere, no subdomain routing. See blueprint §10 for what reintroducing it later would involve — don't pre-build any of it now.

Full system design reference: `docs/00-project/blueprint.md` (the v4 blueprint). This file covers *how to work in the codebase*; the blueprint covers *what the system is*.

## Required Workflow

Every non-trivial implementation task in this repo goes through the `plan-council-code-test` skill (`.claude/skills/plan-council-code-test/SKILL.md`): déjà vu check → plan → multi-perspective council review (approve/deny) → code → full test suite (backend + frontend, old and new tests) → fix-and-retest if needed → cleanup & commit. Do not skip steps because a task looks small.

The initial build (`01.md`–`08.md`) and completion audit (`09.md`) are complete — they now live in `docs/00-project/prompts/` as a historical record of what was built and why, not an active sequence to work through. New work doesn't need to reference them by number; just use the `plan-council-code-test` skill directly for whatever the current task is.

Incident-style fixes (standalone, as-needed corrections to something already built) are handled as direct prompts in the moment, not saved as files — describe the issue and use the `plan-council-code-test` skill for it, same as any other task. They're not chained into the original 01–09 sequence.

## Documentation

This repo's `docs/` vault is written directly as markdown files (no MCP documentation server is available in this environment):

- `docs/00-project/architecture-decisions/` — one ADR per non-obvious design decision.
- `docs/00-project/plans/` — the approved plan for each task, written once the council approves it in Step 2 of the skill.
- `docs/00-project/prompts/` — the numbered task prompts (reference only).
- `docs/01-issues/` — one note per GitHub issue, if/when issue tracking is in use.
- `docs/02-research/` — Laravel/Inertia/React/shadcn research.
- `docs/03-daily-logs/` — optional session summaries.

## Development Commands

- **Start dev servers**: `php artisan serve` and `npm run dev` in separate tabs.
- **Build for production**: `npm run build`.
- **Run backend tests**: `php artisan test` (Pest) — always run the **full** suite for any task.
- **Run frontend component tests**: `npm run test` (Vitest + React Testing Library).
- **Run a single backend test**: `php artisan test --filter=testName` (quick iteration only; full suite still required before a task is done).
- **Lint and fix (PHP)**: `vendor/bin/pint --format agent`.
- **Lint and fix (JS/TS)**: `npm run lint -- --fix`.
- **Add a shadcn component**: `npx shadcn@latest add <component>` — generates into `resources/js/components/ui/`.
- **Database**: `php artisan migrate`, `migrate:rollback`, `migrate:fresh`, `db:seed` / `migrate:fresh --seed`.
- **Cache**: `php artisan cache:clear`, `config:clear`, `route:clear`, `view:clear`.
- **Tinker**: `php artisan tinker --execute '...'` (single quotes to prevent shell expansion).

## Code Architecture

- **No multi-tenancy.** No `IdentifyTenant` middleware, no `BelongsToTenant` trait, no subdomain routing, no `tenant_id` column on anything. Access control is role-based, not tenant-based (see Roles below).
- **No Filament, no Livewire.** Every screen is a React page rendered through Inertia.
- **One Admin Panel** (`/admin`, role-gated), not a Super Admin/Tenant Panel split — see blueprint §4.1 for the route-group-per-role structure.
- **Frontend structure**:
  ```
  resources/js/
  ├── Pages/                         # Inertia page components (flat, not nested)
  ├── Layouts/                       # AdminLayout
  ├── Components/ui/                 # shadcn generated primitives — do not hand-edit
  ├── Components/admin/              # Admin panel components (AdminMenu, AdminOrders, etc.)
  ├── Components/public/             # Public components (CheckoutDialog, PublicOrderTracker)
  ├── Components/                    # Shared components (DataTable, CategoryManagerDialog)
  └── lib/                           # echo.ts, api.ts, offline-storage.ts
  ```
- **Navigation**: `AdminLayout.tsx` includes real sidebar/nav UI, not just individually-reachable routes. Nav items must be derived from the same role/permission source the backend route-gating uses — don't maintain a second, separate list of "what this role can see" that could drift out of sync with what it's actually allowed to access.
- **List/table pages**: use a shared `<DataTable>` component (`resources/js/components/DataTable.tsx`) built on `@tanstack/react-table`, styled with shadcn's table primitives. Column definitions are per-page; sorting/filtering/pagination behavior comes from the shared component. Don't hand-roll table markup for a new list page — extend the shared component if it's missing a capability.
- **Root route**: `/` renders `Public/Menu` via Inertia (the customer ordering page) directly. `resources/views/welcome.blade.php` should not exist in this repo — if it does, that's a bug, not a fallback.
- **Authentication**: `User` model with a `role_id`. `auth` (current user + role) is shared to every Inertia page via `HandleInertiaRequests` — there is no `tenant` prop, since there's no tenant.
- **Frontend build**: Vite, TypeScript, Tailwind v4 + shadcn/ui.
- **Database**: SQLite locally, PostgreSQL in staging/production. Single database, single schema (this was never about tenancy, just deployment simplicity).
- **Testing**: Pest in `tests/Feature`, `tests/Unit`. Playwright Test (`.spec.ts`) in `tests/Browser/`. Vitest tests live next to components as `Component.test.tsx`.

## Roles

Fixed, global, seeded — never user-editable, not even by `admin`:
- `admin` — full Admin Panel access, including Users & Roles.
- `cashier` — Orders/POS, payments.
- `kitchen_staff` — Kitchen Display only.

No `super_admin`, no impersonation — both existed for multi-tenant management and don't apply here.

## Data Model Conventions

- Stock is always derived via `SUM(quantity)` over `inventory_transactions`, never stored or decremented directly on `inventory_items`.
- Stock deduction uses a **validation check** before insert: query current derived stock, reject if deduction would go negative. No application-level locks, no `SELECT FOR UPDATE`. See ADR-0004.
- Roles and permissions are seeded, fixed data.
- `payment_status` is always derived from `SUM(payments.amount)` vs. `orders.total` (`unpaid` / `partially_paid` / `paid` / `refunded`), never set directly.
- Stock deduction happens only on the `preparing` transition; reversals are new transactions, never mutations of the original.
- Payments are cash-only — no gateway, no webhook, no card handling.

## Testing Conventions

- Always run the **full** `php artisan test` suite for any backend task.
- Playwright Test (`.spec.ts`) browser tests live in `tests/Browser/`, navigate the live EnvKit server at `http://test2.test`. **Browser tests must assert specific rendered content, not just that the route returns a 200** — Inertia can return 200 with a blank page if the frontend `resolve()` function fails to match a page component, so a status-only check doesn't actually verify the page works. Assert something real is visible.
- Use Vitest + React Testing Library for isolated component logic; don't unit-test shadcn's generated primitives themselves.
- **Role-based access control (RBAC) tests replace cross-tenant isolation tests** in this version: every route restricted to specific roles needs a test proving the *wrong* role is denied, not just that the right role is allowed. E.g. `kitchen_staff` hitting `/menu` should be denied, `cashier` hitting `/users` should be denied.
- **Broadcast channel authorization** uses `LogBroadcaster` in tests (no real WebSocket server), which doesn't enforce authorization. Test channel callbacks directly by duplicating the callback logic in the test and asserting the return value for authorized/unauthorized users. The `orders` channel checks `$user->role` against `['admin', 'cashier', 'kitchen_staff']`.
- UI-touching tasks require both a Playwright browser test and, where relevant, a Vitest component test. They also require an Impeccable design check (`/impeccable audit` or `/impeccable critique`) once `PRODUCT.md` exists — functional correctness and design quality are checked separately, and both are required, not either/or. `PRODUCT.md` is created once via an interactive `/impeccable init` run with real project context (a restaurant ordering/POS system, not a marketing site) — don't let that step get auto-answered generically. This is standing practice via the `plan-council-code-test` skill's Step 4, not a one-time cleanup.

## Visual Verification (Playwright Browser Skill)

A Playwright browser skill is available for **interactive visual inspection during development and debugging** — navigating to a live page, taking screenshots, reading real browser console/network output. This is separate from, and doesn't replace, the automated test suites:

- **Playwright Test** (`tests/Browser/*.spec.ts`) — automated, run via `npx playwright test`, assert specific outcomes. This is what "the full suite passing" actually means.
- **Vitest** — automated, isolated component logic.
- **Playwright browser skill** — on-demand, used *during* a task, not something that runs automatically as part of the suite. Use this skill to *look*, not to replace what Playwright Test already verifies.

Use it specifically when a bug report is visual/rendering-related and hard to diagnose from code alone, or when confirming a design/styling fix actually produced the intended visual result rather than inferring it from the code that was written.

## Codebase Understanding (Graphify)

Graphify builds a queryable knowledge graph of this repository (code, docs, structure — not runtime memory, not decisions or history) using Tree-sitter AST parsing + LLM semantic extraction, output to `graphify-out/` (`graph.html`, `graph.json`, `GRAPH_REPORT.md`).

- **Use it to understand codebase structure before planning against unfamiliar code** — `/graphify query`, `/graphify path` (trace how two parts of the code connect), `/graphify explain` (a specific node/file/function) — instead of reading through many files one at a time to build the same understanding. This is a token-efficiency tool, not a substitute for reading the actual files you're about to change.
- **Rebuild it when it's stale**: `/graphify .` regenerates the graph. If a task made substantial structural changes (new files, changed relationships), the graph should be rebuilt before the next task relies on it for accuracy.
- `graphify-out/` is a generated artifact — add it to `.gitignore`, don't commit it.
- This is unrelated to decision history — for "has this already been decided," use `docs/00-project/architecture-decisions/` and `docs/00-project/plans/`, per the `plan-council-code-test` skill's Step 0. Graphify answers "how does this code work and relate to other code," not "what did we already decide and why."

## POS/Offline Notes

- **Service Worker** (`public/sw.js`) — caches static assets (build files, icons) and API responses for offline access. Network-first for API calls, cache-first for static assets.
- **IndexedDB** (`resources/js/lib/offline-storage.ts`) — stores queued orders, menu cache, and settings cache when offline. Key object stores: `offlineOrders` (queued/synced/failed), `menuCache`, `settingsCache`.
- **Offline Detection** — `navigator.onLine` + `online`/`offline` window events in `RestaurantContext`. When `isOffline` flips to `false`, queued orders sync automatically.
- **Sync Strategy** — each order has a client-generated `idempotency_key`. Backend `HomeController::store` deduplicates by key. Sync iterates `queued` orders, POSTs each with its key, marks `synced` on success or `failed` on error.
- **Conflict Resolution** — idempotency keys prevent duplicates; no merge conflicts possible since orders are append-only. Failed orders stay in IndexedDB for manual retry or next sync cycle.

## Local Dev Server (EnvKit)

This project runs under an already-running EnvKit server (not `php artisan serve` spun up per-task). **Never shell out to `php artisan serve` manually** — code, tests, and the Playwright browser skill should all target the existing EnvKit URL: `http://test2.test`.

**Playwright Test** — configured in `playwright.config.ts` with `baseURL: 'http://test2.test'`. Run via `npx playwright test`. Tests seed the database via `php artisan migrate:fresh --seed` in `beforeEach` hooks and use UI login for authentication.

**Playwright browser skill** — when used for visual diagnosis or design-fix verification, navigate directly to the EnvKit URL above. Don't start any server first; if it can't reach that URL, that's EnvKit not running, not a missing server to spin up.

**Real risk worth understanding, not glossing over:** if multiple agents/tasks run concurrently (see devswarm setup) and all hit this *same* running server and *same* database, their browser tests can collide — one task's test data (an order, a stock change) can affect another's assertions, since they're not isolated processes the way separate `php artisan serve` instances or separate worktree-local servers would be. This is the direct tradeoff of "use one shared existing server" vs. "each parallel agent gets its own isolated environment." See the devswarm workflow notes for how this is handled.

## Explicitly Out of Scope (For Now)

- **Multi-tenancy** — deferred, not rejected. Reintroducing it later means bringing back `tenants`, `tenant_id`, `IdentifyTenant` middleware, subdomain routing, `super_admin` + impersonation, and cross-tenant isolation testing. Don't speculatively build any of this now.
- Online/card payments and any gateway/webhook/PCI handling.
- Billing, subscription plans, feature flags.
- Admin-authored custom roles or permissions beyond the fixed set.
- Global analytics beyond the Reports feature already in scope.
- Filament and Livewire — do not reintroduce either as a shortcut for a UI need.

## Notes

- Check existing files/components for conventions before creating new ones.
- Do not create new base folders or change dependencies without approval.
- For missing frontend changes, run `npm run build` or `npm run dev`.
- Documentation files only if explicitly requested — except the `docs/` writes and `CLAUDE.md` updates called for by the numbered prompts.
- When creating models, also create factories and seeders.
- Use named routes and `route()` for URL generation; on the frontend, use Inertia's `<Link>` and `router.visit()` rather than raw `<a>` tags or `fetch`.
- For Vite manifest errors, run `npm run build`.
- Run Pint before finalizing PHP changes; run ESLint before finalizing TS/JS changes.