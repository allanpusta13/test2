import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('admin can see all navigation items in sidebar', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // Wait for the sidebar header to be visible (contains "Admin Backoffice")
  await expect(page.getByText('Admin Backoffice')).toBeVisible({ timeout: 10000 });
  
  // Now check for the group labels and items
  const expectedTexts = [
    'OPERATIONS & SERVICE',
    'POS Terminal',
    'Orders & Register',
    'Kitchen KDS',
    'INVENTORY & CATALOG',
    'Menu & Recipes',
    'Derived Ledger',
    'STAFF & GOVERNANCE',
    'Staff Directory',
    'RBAC Permissions'
  ];
  
  for (const text of expectedTexts) {
    await expect(page.getByText(text)).toBeVisible();
  }
  
  await page.screenshot({ path: '/tmp/admin_nav_items_visible.png' });
});
