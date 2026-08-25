# Design System & UI Architecture Document: Artisan POS & Kitchen System

## 1. Design Philosophy & Aesthetic Archetype

The Artisan POS & Kitchen System adheres to a **Dark Artisan Industrial** design archetype. The interface blends the rustic warmth of an artisanal kitchen with the high-contrast readability and ergonomic efficiency demanded by commercial POS registers and kitchen display boards.

### Core Principles
- **High-Contrast Readability**: Engineered for high-stress, variable-lighting environments (dark dining rooms, bright kitchen line prep stations, fast counter service).
- **Anti-Slop Restraint**: Zero generic purple/cyan glow gradients, artificial glassmorphism, or nested cards. Hierarchy is established through typography, contrast ratios, and deliberate spacing.
- **Ergonomic Touch Targets**: Minimum 44px touch targets across all interactive buttons, pills, and line-item counters to support touchscreens and tablet POS registers.
- **Monospaced Numerical Precision**: Financial amounts, quantities, inventory balances, and receipt payloads utilize tabular monospaced numbers to prevent visual jitter.

---

## 2. Typographic Hierarchy & Pairing

| Role | Font Family | Weights | Usage & Characteristics |
| :--- | :--- | :--- | :--- |
| **Primary UI / Headings** | `Plus Jakarta Sans` | `600` (Semi-Bold), `700` (Bold), `800` (Extra-Bold) | Modern geometric sans with open apertures for maximum legibility on digital screens. |
| **Body & Labels** | `Plus Jakarta Sans` | `400` (Regular), `500` (Medium) | Neutral, readable body text formatted with 1.5–1.7 line height and bounded line lengths (65–75ch). |
| **Numbers & POS Receipts** | `JetBrains Mono` | `400` (Regular), `500` (Medium), `600` (Semi-Bold) | Tabular alignment for prices (`$18.50`), timestamps, token IDs (`OT-98F12A`), and ESC/POS thermal text. |

### Type Scale
- **H1 (Screen / Hero Title)**: `2.25rem` (36px) | `tracking-tight` | `font-bold`
- **H2 (Section Header / Card Group)**: `1.5rem` (24px) | `tracking-tight` | `font-semibold`
- **H3 (Dialog Header / Sub-Category)**: `1.125rem` (18px) | `font-semibold`
- **Body Large**: `1.0rem` (16px) | `leading-relaxed`
- **Body Small / Captions**: `0.875rem` (14px) | `text-stone-400`
- **Micro / Metadata Badge**: `0.75rem` (12px) | `font-medium` | `uppercase` / `tabular-nums`

---

## 3. Color Palette & Semantic Design Tokens

### 3.1. Surface & Neutral Scale
```css
/* Deep obsidian canvas with warm stone undertones */
--bg-app:        #0c0a09; /* stone-950 (Main Canvas Background) */
--bg-surface:    #1c1917; /* stone-900 (Card / Panel / Drawer Surface) */
--bg-surface-up: #292524; /* stone-800 (Hover State / Elevated Tile) */
--border-subtle: #44403c; /* stone-700 / 50% opacity (Structural Dividers) */
--border-active: #78716c; /* stone-500 (Focused / Active Outlines) */
```

### 3.2. Brand & Accent Colors
```css
/* Warm culinary gold & wood-fired amber */
--primary-amber:     #f59e0b; /* amber-500 (CTA Buttons, Active Tabs, Highlights) */
--primary-amber-hover: #d97706; /* amber-600 */
--primary-glow:      rgba(245, 158, 11, 0.15); /* Subtle focus ring */
```

### 3.3. Semantic Status Indicators

| Status Key | Background Token | Text Token | Border Token | Operational Meaning |
| :--- | :--- | :--- | :--- | :--- |
| **Pending** | `bg-amber-500/10` | `text-amber-400` | `border-amber-500/30` | New customer order awaiting kitchen claim / preparation |
| **Preparing** | `bg-blue-500/10` | `text-blue-400` | `border-blue-500/30` | Actively cooking on the line; BOM inventory deducted |
| **Ready** | `bg-emerald-500/10` | `text-emerald-400` | `border-emerald-500/30` | Plated and awaiting customer pickup or table delivery |
| **Completed / Paid**| `bg-emerald-500/15` | `text-emerald-300` | `border-emerald-500/40` | Fulfilled and fully settled at cashier register |
| **Low Stock / Void**| `bg-rose-500/10` | `text-rose-400` | `border-rose-500/30` | Ingredient below threshold or order cancelled |

---

## 4. Layout Architecture & Component Hierarchy

### 4.1. Visual Depth & Flattening
- Instead of nesting containers inside containers, hierarchy is created through:
  1. Contrast transitions (`stone-950` → `stone-900` → `stone-800`).
  2. Single-pixel high-contrast dividers (`border-stone-800`).
  3. Clean mathematical margins: Outer container padding is always 16px–24px; inner item gap is 12px–16px.

### 4.2. Mathematical Border Radii
- Standard Cards & Dialogs: `rounded-xl` (12px)
- Interactive Buttons & Pills: `rounded-lg` (8px) or `rounded-full` (for category pills and avatar chips)
- Inner Elements inside Rounded Cards: `Inner Radius = Outer Radius - Padding`

---

## 5. Screen Blueprints & Responsive Layouts

### 5.1. Customer Storefront (`/`)
- **Category Filter Rail**: Horizontal swipeable pill strip with icon + label pairing (`Pizza`, `Pasta`, `Antipasti`, `Dolci`, `Vino`).
- **Dish Grid**: Responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) featuring dish photography, price badge, ingredient list, and customizable tag.
- **Floating Cart Pill**: Sticky bottom-right trigger showing live item count and subtotal with slide-over drawer on click.

### 5.2. Walk-In POS Terminal (`/pos`)
- **Two-Column Split Layout**:
  - *Left (65% width)*: Category tabs + high-density item grid with large touch targets for quick entry.
  - *Right (35% width)*: Live order slip summary, table/takeaway selector, fast cash denomination buttons ($10, $20, $50, $100, Exact), and instant Tender & Print trigger.

### 5.3. Kitchen Display Board (`/kitchen`)
- **Three-Lane Kanban**: `Pending Orders`, `Preparing (In Oven / On Line)`, `Ready for Pickup`.
- **High-Visibility Ticket Header**: Bold order number `#AB-1002`, table number badge, elapsed timer with alert threshold.
- **One-Tap Bump Button**: Large tactile button spanning ticket width to transition state in a single action.

### 5.4. Derived Stock Inventory Ledger (`/inventory`)
- **Stock Summary Cards**: Total active SKUs, low-stock alerts, total inventory valuation.
- **Ingredient Table**: Name, category, derived on-hand balance, low-stock threshold warning, and inline "Restock / Log Waste" actions.
- **Audit Transaction Ledger**: Complete immutable chronological history of all restocks, prep deductions, and adjustments.

---

## 6. Micro-Interactions & Animation Patterns

- **Motion Transitions (`motion/react`)**:
  - Page Surface Transitions: Subtle opacity fade (`opacity: 0 → 1`, `duration: 0.15s`).
  - Slide-Over Drawer: Spring-animated right-to-left slide with darkened backdrop.
  - KDS Ticket Bumping: Layout animations smoothly shifting tickets across lanes when bumped.
- **Tactile Active Feedback**:
  - Buttons use `active:scale-[0.98]` and `transition-transform` for physical press feedback.
- **Optimistic UI Updates**:
  - Cart modifications, order status transitions, and payment entries immediately reflect in the UI while syncing asynchronously.

---

## 7. Thermal Receipt Layout Specification (ESC/POS)

```
========================================
         THE ARTISAN BISTRO             
     452 Via Roma, Little Italy, NY     
         Tel: +1 (555) 234-8901         
----------------------------------------
ORDER: #AB-1001       TYPE: DINE-IN     
DATE:  08/21/2026 06:45 PM              
TABLE: Table 4                          
GUEST: David Vance                      
TRACK: OT-98F12A                        
----------------------------------------
1x Margherita D.O.P. Pizza       $22.00
   + Pizza Size: Regular (12-inch)      
   + Extra: Buffalo Mozzarella (+$3.50) 
2x Traditional Nonna Tiramisu    $19.00
----------------------------------------
SUBTOTAL:                        $41.00
TAX (8.88%):                      $3.64
TOTAL AMOUNT:                    $44.64
----------------------------------------
CASH PAYMENT #1:                 $44.64
  TENDERED / CHANGE:     $50.00 / $5.36 
UNCOLLECTED BALANCE:              $0.00
----------------------------------------
             GRAZIE MILLE!              
       Thank you for dining with us.    
  Please retain ticket for collection.  
========================================
```
