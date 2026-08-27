import { test, expect } from '@playwright/test';

test('debug login page', async ({ page }) => {
  await page.goto('/login');
  await page.screenshot({ path: '/tmp/login_page.png' });
  // Print all button text
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    console.log(await btn.textContent());
  }
});
