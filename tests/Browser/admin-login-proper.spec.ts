import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('admin login and navigation', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // Wait for dashboard to load
  await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible({ timeout: 10000 });
  
  // Check that admin sees all expected navigation items
  await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Orders/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Menu/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Inventory/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Users/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Roles/i })).toBeVisible();
  
  await page.screenshot({ path: '/tmp/admin_login_nav.png' });
});
