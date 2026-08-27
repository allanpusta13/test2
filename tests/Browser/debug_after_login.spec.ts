import { test, expect } from '@playwright/test';

test('debug after login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('admin@test.test');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).click();
  
  // Wait a bit and see what's on the page
  await page.waitForTimeout(3000);
  
  // Get all headings
  const headings = await page.$$('h1, h2, h3, h4, h5, h6');
  for (const h of headings) {
    console.log(await h.textContent());
  }
  
  // Get all links
  const links = await page.$$('a, [role="link"]');
  for (const l of links) {
    const text = await l.textContent();
    if (text && text.trim()) {
      console.log('Link:', text.trim());
    }
  }
  
  await page.screenshot({ path: '/tmp/after_login_debug.png' });
});
