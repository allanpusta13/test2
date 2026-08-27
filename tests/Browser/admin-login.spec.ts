import { test, expect } from '@playwright/test';

test('admin login and navigation', async ({ page }) => {
  await page.goto('/login');
  // Fill in login form for admin (using credentials from UserSeeder)
  await page.getByLabel('Email').fill('elena@artisanbistro.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).click();
  
  // Wait for dashboard to load
  await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible({ timeout: 10000 });
  
  // Check that admin sees all expected navigation items
  await expect(page.getByRole('link', { name: /Dashboard/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Orders/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Menu/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Inventory/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Users/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Roles/i })).toBeVisible();
  
  await page.screenshot({ path: '/tmp/admin_login_nav.png' });
});
