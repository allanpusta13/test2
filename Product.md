# Product Requirements & Architecture Document: Artisan POS & Kitchen System

## 1. Executive Summary & Vision

**Artisan POS & Kitchen System** is an end-to-end restaurant management, point-of-sale, and customer ordering platform designed for modern food-and-beverage establishments. Built on **Laravel 13**, **React 19 with TypeScript**, **Inertia.js**, and **shadcn/ui**, the system unifies three core operational surfaces into a cohesive, real-time application:

1. **Customer-Facing Digital Storefront & Order Tracker**: Frictionless browsing, dish customization, QR-ready checkout, and live preparation status tracking.
2. **Fast POS Counter & Cashier Terminal**: High-velocity order entry, cash tendering calculation, and network ESC/POS thermal receipt printing.
3. **Kitchen Display System (KDS) & Backoffice Engine**: Real-time kitchen ticket flow, automated Bill-of-Materials (BOM) inventory deductions, ledger-derived stock auditing, and strict Role-Based Access Control (RBAC).

---

## 2. Target User Personas & Roles

| Persona | Role Key | Primary Responsibilities & Surface Access |
| :--- | :--- | :--- |
| **Guest / Diner** | `guest` | Browses digital menu, configures dish modifiers, places dine-in/takeaway orders, tracks live ticket status with secure tracking tokens. |
| **Cashier** | `cashier` | Operates POS terminal, takes walk-in orders, collects and records cash payments, dispenses change, prints ESC/POS receipts. |
| **Kitchen Staff / Line Cook** | `kitchen_staff` | Monitors Kitchen Display System (KDS), claims orders, marks tickets *Preparing* (triggering BOM stock consumption) and *Ready*. |
| **Admin / General Manager** | `admin` | Full governance: menu catalog pricing & recipe formulas, inventory stock inflows/audits, staff user accounts, role permission matrix, store settings. |

---

## 3. Core Operational Surfaces & Functional Scope

### 3.1. Public Digital Menu & Customer Ordering
- **Menu Categorization**: Fast tab-based filtering across categories (Pizzas, Pastas, Antipasti, Dolci, Beverages).
- **Modifier Engine**: Multi-tiered modifier groups with constraints (`required`, `min_selection`, `max_selection`, and additional pricing).
- **Interactive Cart & Order Drawer**: Live quantity controls, custom line-item notes, and dynamic tax calculation.
- **Pay-at-Counter Workflow**: Clear guest notices indicating that orders are queued for counter cash payment upon arrival.

### 3.2. Live Customer Order Tracker
- **Tokenized URL Routing**: Secure alphanumeric tracking tokens (e.g. `OT-98F12A`) accessible via `/tracker/{token}`.
- **4-Stage Visual Progress Indicator**: `Pending` → `Preparing` → `Ready for Pickup / Serving` → `Completed`.
- **Itemized Breakdown & Receipt Details**: Displays ordered items, selected modifier options, notes, and live payment status.

### 3.3. Fast POS Walk-In Terminal
- **High-Density Touch Grid**: Categorized menu tiles with single-tap add-to-order for rapid line busting.
- **Quick Cash Tendering Calculator**: One-click quick tender buttons ($10, $20, $50, $100, Exact) with real-time change calculation.
- **Idempotency Protection**: Deterministic UUID/timestamp-based keys to eliminate accidental double-charges or duplicate order submissions.
- **Offline Mode & Action Queue**: Local state preservation that queues mutations during network drops and syncs upon reconnection.

### 3.4. Kitchen Display System (KDS)
- **Live Ticket Board**: High-contrast, color-coded ticket columns (`Pending`, `Preparing`, `Ready`).
- **Ticket Bump Action**:
  - Transitioning `Pending` → `Preparing` automatically consumes raw inventory ingredients based on item BOM recipes.
  - Cancelling an in-flight order triggers automated inventory reversal entries in the stock ledger.
- **Elapsed Time Tracking**: Color alerts for tickets waiting beyond target preparation thresholds.

### 3.5. Derived-Stock Inventory Ledger
- **Transaction-Only Ledger**: Eliminates race conditions by computing stock as `SUM(quantity)` over the transaction ledger.
- **Transaction Types**:
  - `restock`: Inbound supplier deliveries.
  - `prep_deduction`: Automated BOM usage on dish preparation.
  - `cancellation_reversal`: Inflow correction when orders are voided.
  - `waste`: Spoilage or damaged ingredient logging.
  - `audit_adjustment`: Manual stock count reconciliation.
- **Threshold Alerts**: Visual badges identifying items below minimum replenishment thresholds.

### 3.6. ESC/POS Receipt Printing Engine
- **Dual Format Support**: Standard **80mm** (42 columns) and compact **58mm** (32 columns) thermal printers.
- **Byte Stream Generation**: Produces formatted plaintext receipts alongside raw ESC/POS command sequences (e.g. `ESC @` initialize, `GS V` paper cut, `ESC p` cash drawer kick).
- **Visual Receipt Previewer**: Modal showing exact monospaced thermal slip preview.

### 3.7. Role-Based Access Control (RBAC) Matrix
- **Immutable Security Matrix**: Strict code-level enforcement mapping permissions (`menu.manage`, `orders.payment_collect`, `kitchen.kds_screen`, etc.) to authorized roles.
- **Zero-Trust Cash Payment Gate**: Strictly prevents non-cashier roles or public guests from recording payments.

---

## 4. Key Business Logic & System Invariants

1. **Cash Payment Isolation**: Public guests can submit orders with status `pending` / `unpaid`. Cash can ONLY be tendered and recorded by authenticated `cashier` or `admin` accounts.
2. **Bill-of-Materials (BOM) Stock Deduction**: Inventory is deducted when the kitchen moves an order to `preparing`, ensuring canceled orders that were never started do not impact inventory counts.
3. **Ledger Immutability**: Stock levels are derived dynamically rather than updated via mutable counter columns, providing a complete audit trail.
4. **Idempotency**: All order creation and payment requests include an `idempotency_key` ensuring offline re-syncs never create duplicate records.

---

## 5. Technology Stack & Directory Structure

```
├── app/                      # Laravel 13 Core Backend (Controllers, Models, Policies)
├── config/                   # Application & Service Configurations
├── database/                 # Migrations, Factories & Seeders
├── resources/
│   ├── css/
│   │   └── app.css           # Tailwind CSS 4 Theme & Global Tokens
│   ├── js/
│   │   ├── Components/       # React Modular Components (Admin, Public, Shared)
│   │   │   ├── admin/        # Admin, POS, KDS, Menu, Inventory & Users Panels
│   │   │   ├── public/       # Customer Menu, Cart, Customizer & Tracker
│   │   │   ├── shared/       # Order Details Dialog & ESC/POS Receipt Modal
│   │   │   └── ui/           # Radix-UI + shadcn/ui Component Primitives
│   │   ├── Context/          # RestaurantContext State & Business Logic Provider
│   │   ├── Layouts/          # AppLayout & AdminLayout Wrappers
│   │   ├── Pages/            # Inertia.js Page Components (Index, Pos, Kitchen, etc.)
│   │   ├── data/             # Initial Fixtures & Seed Catalog
│   │   ├── lib/              # Axios REST Client, Utils & Validation Helpers
│   │   ├── types/            # TypeScript Interfaces & Global Declarations
│   │   ├── app.tsx           # Inertia Client Bootstrapper
│   │   └── main.tsx          # Standalone Preview Entry Point
│   └── views/
│       └── app.blade.php     # Laravel Inertia Root Blade Layout
├── routes/
│   ├── api.php               # RESTful API Endpoints
│   └── web.php               # Inertia Web Routes
└── components.json           # shadcn/ui Starterkit Configuration
```

---

## 6. Future Enhancements & Integration Roadmap

- **WebSocket / Laravel Reverb Real-Time Broadcasts**: Instant kitchen ticket push notifications and customer order tracker status updates without polling.
- **Direct WebUSB / Network ESC/POS Bridge**: Direct browser-to-thermal printer raw TCP socket printing.
- **Multi-Location & Kitchen Prep Stations**: Routing order items to specific stations (e.g. Pizza Oven vs. Salad Bar vs. Drink Station).
- **Barcode / QR Table Ordering**: Dynamic table-specific QR codes automatically populating `table_number` during customer checkout.
