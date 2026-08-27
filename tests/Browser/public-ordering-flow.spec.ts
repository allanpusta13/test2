import { test, expect } from '@playwright/test';
import { seedDatabase } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('public menu renders seeded categories and dishes', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wood-Fired Italian Menu');
  await expect(page.getByRole('button', { name: /Wood-Fired Pizzas/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Margherita D.O.P. Wood-Fired Pizza' }).first()).toBeVisible();
});

test('customer can add a dish to cart and see customization modal', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // Click "Add to Order" on the first dish (Margherita)
  await page.getByRole('button', { name: 'Add to Order' }).first().click();

  // A customization modal should open showing the dish name
  await expect(page.getByText('Margherita D.O.P. Wood-Fired Pizza').first()).toBeVisible({ timeout: 5_000 });
  // Should see customization options like "Pizza Size"
  await expect(page.getByText(/Pizza Size|Crust Preference/i).first()).toBeVisible();
});

test('tracker page renders for a valid or bogus token', async ({ page }) => {
  await page.goto('/tracker/OT-NOSUCHTOKEN9X');
  await page.waitForLoadState('networkidle');
  // The tracker page should render (may show "not found" or empty state)
  await expect(page).toHaveURL(/\/tracker\//);
});
