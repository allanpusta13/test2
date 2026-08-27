import { test, expect } from '@playwright/test';
import { seedDatabase, loginAs, CREDENTIALS } from './helpers';

test.beforeEach(async ({ page }) => {
  seedDatabase();
  await loginAs(page, CREDENTIALS.adminEmail);
});

test('pos terminal', async ({ page }) => {
  await page.goto('/pos');
  await expect(page).toHaveTitle(/POS Fast Cash Terminal/);
});

test('kitchen display system', async ({ page }) => {
  await page.goto('/kitchen');
  await expect(page).toHaveTitle(/Kitchen Display System/);
});

test('orders page loads', async ({ page }) => {
  await page.goto('/orders');
  await expect(page).toHaveURL(/\/orders/);
});

test('menu page loads', async ({ page }) => {
  await page.goto('/menu');
  await expect(page).toHaveURL(/\/menu/);
});

test('inventory page loads', async ({ page }) => {
  await page.goto('/inventory');
  await expect(page).toHaveURL(/\/inventory/);
});

test('users page loads', async ({ page }) => {
  await page.goto('/users');
  await expect(page).toHaveURL(/\/users/);
});

test('roles page loads', async ({ page }) => {
  await page.goto('/roles');
  await expect(page).toHaveURL(/\/roles/);
});

test('settings endpoint serves restaurant settings json', async ({ page }) => {
  const response = await page.goto('/settings');
  const body = await response?.text();
  expect(body).toContain('"success":true');
  expect(body).toContain('The Artisan Wood-Fired Bistro');
});

test('sign out revokes access to protected routes', async ({ page }) => {
  await page.goto('/pos');
  await expect(page).toHaveTitle(/POS Fast Cash Terminal/);

  // Click the user avatar/name in header to open dropdown
  const headerUserBtn = page.locator('header button, [role="banner"] button').filter({ hasText: /Elena/ }).first();
  await headerUserBtn.click();

  // Click Sign Out in the dropdown
  await page.getByText('Sign Out (Laravel Logout)').click();

  await page.goto('/orders');
  await expect(page).toHaveURL(/\/login/);
});
