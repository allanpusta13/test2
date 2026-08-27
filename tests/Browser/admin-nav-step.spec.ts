import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('admin can see navigation items after login', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // Wait for the POS page to load (we are redirected to POS after login)
  await expect(page).toHaveTitle(/POS Fast Cash Terminal/);
  
  // We are on the POS page. Now we need to open the admin sidebar section.
  // Look for the sidebar navigation element (maybe an aside or a div with a specific class)
  // Let's try to find an element that contains the text "Admin Backoffice" and click it to expand if it's a collapsible header.
  const adminBackofficeHeader = page.getByText('Admin Backoffice');
  if (await adminBackofficeHeader.isVisible()) {
    await adminBackofficeHeader.click();
    // Wait a bit for the sidebar to expand
    await page.waitForTimeout(500);
  }
  
  // Now check for the admin navigation links in the sidebar
  // We expect to see links for Dashboard, Orders, Menu, Inventory, Users, Roles
  // Note: the text in the sidebar might be exactly as seen in the debug output: 
  //   OPERATIONS & SERVICE
  //   POS Terminal
  //   Cash Only
  //   Orders & Register
  //   ... etc.
  
  // We'll look for the sidebar by role navigation or by a common class.
  const sidebar = page.getByRole('navigation', { name: /sidebar/i });
  let sidebarLinks: any[];
  if (await sidebar.isVisible()) {
    sidebarLinks = await sidebar.$$('a, [role="link"]');
  } else {
    // Fallback: look for links in the whole page that are likely in the sidebar
    sidebarLinks = await page.$$('aside a, [class*="sidebar"] a, [class*="Sidebar"] a');
  }
  
  // If we still don't have links, look for any link that contains the expected text
  const expectedLinks = [
    'Dashboard',
    'Orders',
    'Menu',
    'Inventory',
    'Users',
    'Roles'
  ];
  
  for (const text of expectedLinks) {
    let found = false;
    for (const link of sidebarLinks) {
      const linkText = await link.textContent();
      if (linkText && linkText.trim() === text) {
        found = true;
        break;
      }
    }
    if (!found) {
      // If not found in the sidebar links, try to find by role link on the whole page
      const linkByRole = page.getByRole('link', { name: text });
      if (!(await linkByRole.isVisible())) {
        throw new Error(`Link with text "${text}" is not visible`);
      }
    }
  }
  
  // If we get here, all expected links are visible (either in sidebar or on page)
  await page.screenshot({ path: '/tmp/admin_nav_links_visible.png' });
});
