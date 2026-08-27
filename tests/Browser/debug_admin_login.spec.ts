import { test, expect } from '@playwright/test';
import { loginAs, CREDENTIALS } from './helpers';

test('debug admin login', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  
  // Wait for network idle
  await page.waitForLoadState('networkidle');
  
  // Get the page URL and title
  console.log('URL after login:', page.url());
  console.log('Title after login:', await page.title());
  
  // Get the full HTML body
  const bodyHTML = await page.locator('body').innerHTML();
  console.log('Body HTML (first 2000 chars):', bodyHTML.substring(0, 2000));
  
  // Get all text content
  const bodyText = await page.locator('body').innerText();
  console.log('Body text (first 2000 chars):', bodyText.substring(0, 2000));
  
  // Look for any heading
  const headings = await page.$$('h1, h2, h3, h4, h5, h6');
  console.log('Number of headings:', headings.length);
  for (let i = 0; i < headings.length; i++) {
    console.log(`Heading ${i}:`, await headings[i].textContent());
  }
  
  // Look for any link
  const links = await page.$$('a, [role="link"]');
  console.log('Number of links:', links.length);
  for (let i = 0; i < Math.min(links.length, 10); i++) {
    console.log(`Link ${i}:`, await links[i].textContent());
  }
  
  // Take a screenshot
  await page.screenshot({ path: '/tmp/debug_admin_login.png' });
});
