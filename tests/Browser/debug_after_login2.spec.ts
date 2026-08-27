import { test, expect } from '@playwright/test';

test('debug after login with more details', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@test.test');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).click();
  
  // Wait for network idle
  await page.waitForLoadState('networkidle');
  
  // Get the page title and URL
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  
  // Get all text content from the body
  const bodyText = await page.locator('body').innerText();
  console.log('Body text (first 500 chars):', bodyText.substring(0, 500));
  
  // Look for common admin dashboard elements
  const dashboardHeading = page.getByRole('heading', { name: /Dashboard/i });
  if (await dashboardHeading.isVisible()) {
    console.log('Dashboard heading found');
  } else {
    console.log('Dashboard heading NOT found');
  }
  
  // Look for sidebar navigation
  const sidebar = page.getByRole('navigation');
  if (await sidebar.isVisible()) {
    const navLinks = await sidebar.$$('a, [role="link"]');
    console.log('Number of nav links in sidebar:', navLinks.length);
    for (const link of navLinks) {
      const text = await link.textContent();
      console.log('  Nav link:', text?.trim());
    }
  } else {
    console.log('Sidebar navigation not found');
  }
  
  await page.screenshot({ path: '/tmp/after_login_debug2.png' });
});
