import { test, expect } from '@playwright/test';
import { seedDatabase, loginAs, CREDENTIALS } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('login page renders the staff portal form', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle(/Staff Sign In/);
  await expect(page.getByText('Staff Portal')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Staff Email Address' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Authenticate & Enter Workspace' })).toBeVisible();
});

test('admin login via the real form lands on the pos surface', async ({ page }) => {
  await loginAs(page, CREDENTIALS.adminEmail);
  await expect(page).toHaveTitle(/POS Fast Cash Terminal/);
});

test('invalid credentials show an authentication error', async ({ page }) => {
  await page.goto('/login');
  // Use a non-existent email to bypass the offline fallback
  await page.getByRole('textbox', { name: 'Staff Email Address' }).fill('nonexistent@nowhere.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('wrong');
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).click();
  // Should see error message
  await expect(page.getByText('Authentication Error')).toBeVisible({ timeout: 10_000 });
});

test('guests are redirected to login from protected admin routes', async ({ page }) => {
  for (const path of ['/orders', '/users']) {
    await page.goto(path);
    await expect(page).toHaveURL(/\/login/);
  }
});
