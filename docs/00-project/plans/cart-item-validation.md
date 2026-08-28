# Plan: Validate/Normalize Parsed Cart Items from localStorage

## Problem
`JSON.parse(saved)` in the cart initializer is returned directly as `CartItem[]` without validation. Malformed or old-schema data from `localStorage` can cause runtime errors — e.g., `updateCartItemQty` assumes `i.quantity` and `i.total_price` are numbers, so missing/undefined fields produce `NaN` and break cart math silently.

## Solution
Add a `parseCartFromStorage` helper function that:
1. Checks the parsed value is an array.
2. For each item, verifies required fields exist with correct types (`cart_id`: string, `menu_item_id`: string, `name`: string, `quantity`: number, `unit_price`: number, `total_price`: number, `selected_modifiers`: array).
3. Coerces numeric fields to `Number()` (handles string-encoded numbers from old schemas).
4. Drops items that fail validation (logs a warning once), returns only valid items.
5. Returns `[]` if the top-level value isn't an array.

This is a **best-effort recovery** — preserve what's valid, drop what's corrupt — rather than nuking the entire cart for one bad item.

## Files to Modify
- `resources/js/Context/RestaurantContext.tsx` — replace the inline `JSON.parse` in the cart initializer with the helper call.

## Required Fields (CartItem extends OrderItem + cart_id)
| Field | Type | Coercion |
|---|---|---|
| `id` | string | must exist |
| `cart_id` | string | must exist |
| `menu_item_id` | string | must exist |
| `name` | string | must exist |
| `quantity` | number | `Number()` coerce, must be finite and >= 1 |
| `unit_price` | number | `Number()` coerce, must be finite and >= 0 |
| `total_price` | number | `Number()` coerce, must be finite and >= 0 |
| `selected_modifiers` | array | must be array (default `[]`) |

## Expected Behavior
- Valid cart data loads as before (no behavior change).
- Corrupt items are silently dropped; valid items are preserved.
- Entirely invalid storage returns `[]`.
- Items with `quantity < 1`, non-finite numbers, or `null`/`undefined` numeric fields are rejected.
- No new dependencies.

## Tests
Add `resources/js/__tests__/CartValidation.test.ts` covering:
- Valid cart passes
- One corrupted item → drops bad, keeps good
- Non-array input → `[]`
- String-encoded numbers → coerced correctly
- `null`/`undefined` numeric fields → rejected
- `quantity: 0` → rejected (divides by zero downstream)
- `selected_modifiers` not an array → rejected
- Empty array → `[]`
- Extra unknown fields → passes (don't reject unknown keys)

## Out of Scope
- Schema migration for old cart formats.
- Persisting validation errors to logs/analytics.
- Validating auth user storage (separate concern).
