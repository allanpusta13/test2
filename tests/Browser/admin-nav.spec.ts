import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('admin login and navigation to admin panel', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // Wait for network idle
  await page.waitForLoadState('networkidle');
  
  // We might be on the POS page, but we should see the admin sidebar
  // Let's wait for the sidebar to be visible (if it exists)
  const sidebar = page.getByRole('navigation', { name: /sidebar/i });
  if (await sidebar.isVisible()) {
    // Check the sidebar links
    await expect(sidebar.getByRole('link', { name: /OPERATIONS & SERVICE/i })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: /Orders & Register/i })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: /Menu & Recipes/i })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: /INVENTORY & CATALOG/i })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: /Staff Directory/i })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: /RBAC Permissions/i })).toBeVisible();
  } else {
    // If no navigation role, look for the links in the whole page
    await expect(page.getByRole('link', { name: /OPERATIONS & SERVICE/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Orders & Register/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Menu & Recipes/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /INVENTORY & CATALOG/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Staff Directory/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /RBAC Permissions/i })).toBeVisible();
  }
  
  await page.screenshot({ path: '/tmp/admin_nav_after_login.png' });
});
