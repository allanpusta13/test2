# Plan: Full-App Pest Browser Test Suite

Status: **Approved** (council unanimous after one revision round)
Date: 2026-08-26
Task: Browser tests did not exist (`tests/Browser/` missing despite prompts 06/08 calling for them) — create them and navigate through the entire app.

## Serving Mode (the core decision)

Pure **in-process isolation**. Verified against installed vendor source (`pestphp/pest-plugin-browser` ^5.0):

- `ServerManager::http()` (src/ServerManager.php:86–92) always constructs `LaravelHttpServer`, bound to `127.0.0.1:<random port>`.
- Every browser request is handled via `app()->make(HttpKernel::class)` inside the PHPUnit process (src/Drivers/LaravelHttpServer.php:238–279).
- Therefore the **browser observes the same sqlite `:memory:` database the PHP assertions observe**, with phpunit.xml's testing env (array sessions, sync queue). RefreshDatabase state is visible to rendered pages. No external server, no shared EnvKit DB, no concurrent-agent collisions.
- `withHost()` is **not used**: it only sets the Host header + playwright bind host (it does *not* point tests at an external server, contradicting CLAUDE.md's earlier assumption). Correcting CLAUDE.md is part of this task; details in ADR 0006.
- The Browser testsuite inherits the same `<php>` testing env as Unit/Feature from phpunit.xml (global config, not per-suite) — this must hold after any future phpunit.xml refactor or isolation silently breaks.

## Changes

| File | Change |
|---|---|
| `phpunit.xml` | Add `Browser` testsuite → `tests/Browser` |
| `tests/Pest.php` | Extend `TestCase`+`RefreshDatabase` to `'Feature', 'Unit', 'Browser'`; `pest()->browser()->timeout(10000)` |
| `tests/Browser/Credentials.php` | Single test-side credential constant mirroring `UserSeeder` |
| `tests/Browser/PublicOrderingFlowTest.php` | Seeded menu renders on `/`; real 4-step order flow: dish card click → DishCustomizerDialog add-to-cart → cart drawer "Proceed to Checkout" → checkout dialog fill (`#checkout-name`, `#checkout-table`) + submit (`#submit-order-btn`); tracker positive (in-test unique token) + negative (bogus token reveals nothing) |
| `tests/Browser/AuthAndAccessTest.php` | `/login` renders; real form login (`#auth-email`/`#auth-password`) as seeded admin lands on admin surface with role nav; guest redirects from `/orders`, `/users`, `/settings` → `assertPathIs('/login')` (never full-URL asserts — random port) |
| `tests/Browser/AdminSurfacesTest.php` | Admin visits all 8 surfaces (/orders /pos /menu /inventory /users /roles /kitchen /settings), each asserting specific seeded content; logout covered cheaply |
| `tests/Browser/RbacBrowserTest.php` | Full matrix: 3 roles × 8 gated surfaces per actual gating (cashier allowed /orders+/pos only; kitchen_staff allowed /kitchen only). Deny-cases assert rendered 403 content containing `Unauthorized. Required role:` (CheckRole.php:24) — never status-only checks |
| `.gitignore` | Add `tests/Browser/Screenshots/` (plugin writes failure screenshots there) |
| Docs | Plan (this file), ADR 0006, CLAUDE.md correction |

## Conventions applied

- Data: `$this->seed(DatabaseSeeder::class)` per test (full realistic dataset on :memory: sqlite ≈ sub-second).
- Assertions target stable seeded strings (menu item/user names, sidebar labels) — SPA render waits handled by plugin retry architecture; use `fill()`/`type()` (never `typeSlowly`), no bare sleeps.
- All auth through the real login form; no quick-login in setup paths.
- Browser stays in default `php artisan test` run (full-suite convention); fast inner loop documented as `--testsuite Unit,Feature`.

## Deliberately out of scope

No app/frontend code changes; no Vitest additions; offline SW simulation; WebSocket live updates; receipt print view; locale switching; parallel runs. Pre-existing smells recorded in ADR 0006 but not fixed here: AuthController mock-password fallback list, quick-login defaulting to admin, duplicate `/tracker/{token?}` route registration (both map to same controller action).

## Council record

- **Architecture: APPROVE** — in-process isolation fits better than shared EnvKit server; four-file split mirrors route groups; DatabaseSeeder-per-test appropriate. Suggestion adopted: drop `withHost('test2.test')` (it doubles as playwright bind host — would break if hosts entry disappears).
- **Security: DENY → APPROVE (after revision)** — required: resolve serving mode explicitly, full RBAC matrix with exact denial expectations, real-form-only auth, tracker negative case. All adopted. Non-blocking: verify 403 message actually renders (debug forced off during kernel handling; stock error page includes it — confirm at implementation, don't weaken assertions); ADR sentence noting public_path asset serving bypasses the kernel.
- **Testing/Ops: APPROVE** — retry-wrapped assertions handle SPA timing; selector IDs verified in components (`#auth-email/#auth-password`, `#checkout-name/#checkout-table/#submit-order-btn`); failure screenshots auto-attach; Windows spawn path verified. Suggestions adopted: assertPathIs, 4-step order flow, fill over typeSlowly, gitignore screenshots, keep Browser in default suite.
