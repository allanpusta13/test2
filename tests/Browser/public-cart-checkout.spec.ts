import { test, expect } from '@playwright/test';
import { seedDatabase } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('public: navigate to cart, review item, proceed to checkout, place order, and track order', async ({ page }) => {
  await page.goto('/');
  
  // Step 1: Browse menu (already done in previous test, but we do it again to be safe)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wood-Fired Italian Menu');
  
  // Step 2: Add to cart with modifiers (we'll reuse the logic from the existing test)
  // Click "Add to Order" on the first dish (Margherita)
  await page.getByRole('button', { name: 'Add to Order' }).first().click();
  
  // A customization modal should open showing the dish name
  await expect(page.getByText('Margherita D.O.P. Wood-Fired Pizza').first()).toBeVisible({ timeout: 5_000 });
  // Should see customization options like "Pizza Size"
  await expect(page.getByText(/Pizza Size|Crust Preference/i).first()).toBeVisible();
  
  // Select a modifier if available (e.g., first checkbox)
  const firstModifier = page.getByRole('checkbox').first();
  if (await firstModifier.isVisible()) {
    await firstModifier.check();
  }
  // Click the confirm button (e.g., "Add to Order")
  const addToOrderButton = page.getByRole('button', { name: /Add to Order/i });
  await expect(addToOrderButton).toBeVisible();
  await addToOrderButton.click();
  // Wait for modal to close
  // Note: The modal might close automatically after clicking "Add to Order". We'll wait for the cart to update.
  
  // Step 3: Navigate to the cart by clicking (not by URL), review the item.
  await expect(page.getByRole('link', { name: /Cart/i })).toBeVisible();
  await page.getByRole('link', { name: /Cart/i }).click();
  await expect(page).toHaveURL(/\/cart/);
  await expect(page.getByRole('heading', { name: /Your Cart/i })).toBeVisible();
  // Verify at least one item is in the cart
  await expect(page.locator('[data-testid^="cart-item-"]').first()).toBeVisible();
  
  // Step 4: Click through checkout — fill the form, submit the order by clicking.
  await expect(page.getByRole('button', { name: /Proceed to Checkout/i })).toBeVisible();
  await page.getByRole('button', { name: /Proceed to Checkout/i }).click();
  
  // On the checkout page, we expect a form to collect customer name and maybe phone/email.
  await expect(page.getByRole('heading', { name: /Checkout/i })).toBeVisible();
  await page.getByLabel('Name').fill('Test Customer');
  await page.getByLabel('Phone').fill('1234567890');
  // Assuming there is a checkbox for terms or something, but we'll just submit.
  await expect(page.getByRole('button', { name: /Place Order/i })).toBeVisible();
  await page.getByRole('button', { name: /Place Order/i }).click();
  
  // Step 5: Confirm it lands on order tracking, and the status is visible.
  await expect(page).toHaveURL(/\/tracker\//);
  await expect(page.getByRole('heading', { name: /Order Tracker/i })).toBeVisible();
  // The status should be visible (e.g., "Pending Confirmation" or similar)
  await expect(page.getByText(/Pending Confirmation|Preparing|Ready for Pickup|Completed/)).toBeVisible();
});