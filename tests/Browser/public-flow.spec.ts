import { test, expect } from '@playwright/test';
import { seedDatabase } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('public: complete flow from menu to order tracking', async ({ page }) => {
  await page.goto('/');
  
  // Step 1: Browse menu
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wood-Fired Italian Menu');
  
  // Step 2: Add to cart with modifiers
  // Click "Add to Order" on the first dish (Margherita) to open the customization modal
  await page.getByRole('button', { name: 'Add to Order' }).first().click();
  
  // Wait for the modal to appear and show the dish name
  await expect(page.getByText('Margherita D.O.P. Wood-Fired Pizza').first()).toBeVisible({ timeout: 5000 });
  // See customization options
  await expect(page.getByText(/Pizza Size|Crust Preference/i).first()).toBeVisible();
  
  // In the modal, select a modifier if available (e.g., first checkbox)
  const firstModifier = page.getByRole('checkbox').first();
  if (await firstModifier.isVisible()) {
    await firstModifier.check();
  }
  // Click the "Add to Order" button in the modal to add to cart
  const modal = page.getByRole('dialog');
  const addToOrderButtonInModal = modal.getByRole('button', { name: /Add to Order/i });
  await expect(addToOrderButtonInModal).toBeVisible();
  await addToOrderButtonInModal.click();
  
  // Wait for the modal to close (we can wait for the cart to update or the modal to disappear)
  await expect(modal).not.toBeVisible({ timeout: 5000 });
  
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