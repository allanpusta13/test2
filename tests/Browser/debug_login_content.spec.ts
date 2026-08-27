import { test, expect } from '@playwright/test';

test('debug login content', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('elena@artisanbistro.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).click();
  
  // Wait for network idle
  await page.waitForLoadState('networkidle');
  
  // Get the page URL and title
  console.log('URL after login:', page.url());
  console.log('Title after login:', await page.title());
  
  // Get the full HTML body
  const bodyHTML = await page.locator('body').innerHTML();
  console.log('Body HTML (first 1000 chars):', bodyHTML.substring(0, 1000));
  
  // Get all text content
  const bodyText = await page.locator('body').innerText();
  console.log('Body text (first 1000 chars):', bodyText.substring(0, 1000));
  
  // Take a screenshot
  await page.screenshot({ path: '/tmp/debug_login_content.png' });
});
