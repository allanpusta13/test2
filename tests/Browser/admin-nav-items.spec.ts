import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('admin can see and interact with navigation items in sidebar', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // Wait for the sidebar to be visible
  const sidebar = page.getByRole('navigation', { name: /sidebar/i });
  await expect(sidebar).toBeVisible({ timeout: 10000 });
  
  // Expected navigation item titles as they appear in the sidebar
  const expectedItems = [
    'POS Terminal',
    'Orders & Register',
    'Kitchen KDS',
    'Menu & Recipes',
    'Derived Ledger',
    'Staff Directory',
    'RBAC Permissions'
  ];
  
  for (const itemText of expectedItems) {
    // Each sidebar item is a button with the text as its accessible name
    const button = sidebar.getByRole('button', { name: itemText });
    await expect(button).toBeVisible();
    // Check that the button is not disabled (i.e., does not have cursor-not-allowed)
    await expect(button).not.toHaveClass(/cursor-not-allowed/);
    // Optionally, we can click it to verify it navigates (but we'll do that in the next steps)
  }
  
  await page.screenshot({ path: '/tmp/admin_nav_items_visible.png' });
});
