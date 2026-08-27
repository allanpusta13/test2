import { test, expect } from '@playwright/test';

test('step 1: browse menu', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Wood-Fired Italian Menu');
  await expect(page.getByRole('button', { name: 'Wood-Fired Pizzas' })).toBeVisible();
  await page.screenshot({ path: '/tmp/step1_public_browse.png' });
});
