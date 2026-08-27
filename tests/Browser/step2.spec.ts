import { test, expect } from '@playwright/test';

test('step 2: add to cart with modifiers', async ({ page }) => {
  await page.goto('/');
  // Wait for menu to load
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wood-Fired Italian Menu');
  // Click on the first category button (e.g., Wood-Fired Pizzas)
  await page.getByRole('button', { name: 'Wood-Fired Pizzas' }).click();
  // Wait for the category items to load (we can wait for the first item to be visible)
  const firstItem = page.locator('[data-testid^="menu-item-"]').first();
  await expect(firstItem).toBeVisible({ timeout: 10000 });
  // Find the first item and click its "Add to Cart" button
  const addToCartButton = firstItem.getByRole('button', { name: /Add to Cart/i });
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();
  // If there's a modal for modifiers, handle it
  const modifierModal = page.getByRole('dialog', { name: /Customize/i });
  if (await modifierModal.isVisible()) {
    // Select a modifier if available (e.g., first checkbox)
    const firstModifier = modifierModal.getByRole('checkbox').first();
    if (await firstModifier.isVisible()) {
      await firstModifier.check();
    }
    // Click the confirm button (e.g., "Add to Order")
    const addToOrderButton = modifierModal.getByRole('button', { name: /Add to Order/i });
    await expect(addToOrderButton).toBeVisible();
    await addToOrderButton.click();
    // Wait for modal to close
    await expect(modifierModal).not.toBeVisible();
  }
  // Verify cart indicator updates
  await expect(page.getByRole('link', { name: /Cart/i })).toHaveText(/\(\d+\)/);
  await page.screenshot({ path: '/tmp/step2_public_add_to_cart.png' });
});
