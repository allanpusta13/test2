# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-cart-checkout.spec.ts >> public: navigate to cart, review item, proceed to checkout, place order, and track order
- Location: tests\Browser\public-cart-checkout.spec.ts:8:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: getByRole('heading', { level: 1 })
Expected substring: "Wood-Fired Italian Menu"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for getByRole('heading', { level: 1 })

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { seedDatabase } from './helpers';
  3  | 
  4  | test.beforeEach(() => {
  5  |   seedDatabase();
  6  | });
  7  | 
  8  | test('public: navigate to cart, review item, proceed to checkout, place order, and track order', async ({ page }) => {
  9  |   await page.goto('/');
  10 |   
  11 |   // Step 1: Browse menu (already done in previous test, but we do it again to be safe)
> 12 |   await expect(page.getByRole('heading', { level: 1 })).toContainText('Wood-Fired Italian Menu');
     |                                                         ^ Error: expect(locator).toContainText(expected) failed
  13 |   
  14 |   // Step 2: Add to cart with modifiers (we'll reuse the logic from the existing test)
  15 |   // Click "Add to Order" on the first dish (Margherita)
  16 |   await page.getByRole('button', { name: 'Add to Order' }).first().click();
  17 |   
  18 |   // A customization modal should open showing the dish name
  19 |   await expect(page.getByText('Margherita D.O.P. Wood-Fired Pizza').first()).toBeVisible({ timeout: 5_000 });
  20 |   // Should see customization options like "Pizza Size"
  21 |   await expect(page.getByText(/Pizza Size|Crust Preference/i).first()).toBeVisible();
  22 |   
  23 |   // Select a modifier if available (e.g., first checkbox)
  24 |   const firstModifier = page.getByRole('checkbox').first();
  25 |   if (await firstModifier.isVisible()) {
  26 |     await firstModifier.check();
  27 |   }
  28 |   // Click the confirm button (e.g., "Add to Order")
  29 |   const addToOrderButton = page.getByRole('button', { name: /Add to Order/i });
  30 |   await expect(addToOrderButton).toBeVisible();
  31 |   await addToOrderButton.click();
  32 |   // Wait for modal to close
  33 |   // Note: The modal might close automatically after clicking "Add to Order". We'll wait for the cart to update.
  34 |   
  35 |   // Step 3: Navigate to the cart by clicking (not by URL), review the item.
  36 |   await expect(page.getByRole('link', { name: /Cart/i })).toBeVisible();
  37 |   await page.getByRole('link', { name: /Cart/i }).click();
  38 |   await expect(page).toHaveURL(/\/cart/);
  39 |   await expect(page.getByRole('heading', { name: /Your Cart/i })).toBeVisible();
  40 |   // Verify at least one item is in the cart
  41 |   await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();
  42 |   
  43 |   // Step 4: Click through checkout — fill the form, submit the order by clicking.
  44 |   await expect(page.getByRole('button', { name: /Proceed to Checkout/i })).toBeVisible();
  45 |   await page.getByRole('button', { name: /Proceed to Checkout/i }).click();
  46 |   
  47 |   // On the checkout page, we expect a form to collect customer name and maybe phone/email.
  48 |   await expect(page.getByRole('heading', { name: /Checkout/i })).toBeVisible();
  49 |   await page.getByLabel('Name').fill('Test Customer');
  50 |   await page.getByLabel('Phone').fill('1234567890');
  51 |   // Assuming there is a checkbox for terms or something, but we'll just submit.
  52 |   await expect(page.getByRole('button', { name: /Place Order/i })).toBeVisible();
  53 |   await page.getByRole('button', { name: /Place Order/i }).click();
  54 |   
  55 |   // Step 5: Confirm it lands on order tracking, and the status is visible.
  56 |   await expect(page).toHaveURL(/\/tracker\//);
  57 |   await expect(page.getByRole('heading', { name: /Order Tracker/i })).toBeVisible();
  58 |   // The status should be visible (e.g., "Pending Confirmation" or similar)
  59 |   await expect(page.getByText(/Pending Confirmation|Preparing|Ready for Pickup|Completed/)).toBeVisible();
  60 | });
```