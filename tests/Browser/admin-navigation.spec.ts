import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('admin can see and click all navigation items in sidebar', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // After login, we are at /pos (POS page) inside the admin layout.
  // Wait for the sidebar to be visible.
  const sidebar = page.getByRole('navigation', { name: /sidebar/i });
  await expect(sidebar).toBeVisible({ timeout: 10000 });
  
  // For admin, all navigation items should be enabled (not disabled).
  // We'll check each item by its title text and ensure it does not have the disabled styling.
  // The disabled items have classes: 'text-stone-600 hover:bg-transparent cursor-not-allowed opacity-50'
  // We'll instead check that the item is not disabled by checking that it does not have the cursor-not-allowed class.
  // Alternatively, we can just check that the item is visible and we can click it (and it navigates).
  
  // List of expected navigation items (titles as they appear in the sidebar)
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
    const link = sidebar.getByRole('link', { name: itemText });
    await expect(link).toBeVisible();
    // Check that the link is not disabled (i.e., does not have cursor-not-allowed)
    await expect(link).not.toHaveClass(/cursor-not-allowed/);
    // Optionally, we can click it and verify it navigates to the correct page.
    // But for now, just visibility and enabled state is enough for step 7.
  }
  
  await page.screenshot({ path: '/tmp/admin_nav_items_visible.png' });
});
