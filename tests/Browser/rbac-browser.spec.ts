import { test, expect } from '@playwright/test';
import { seedDatabase, loginAs, CREDENTIALS } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test.describe('cashier role access', () => {
  test('cashier can open orders and pos', async ({ page }) => {
    await loginAs(page, CREDENTIALS.cashierEmail);

    await page.goto('/orders');
    await expect(page).toHaveURL(/\/orders/);

    await page.goto('/pos');
    await expect(page).toHaveTitle(/POS Fast Cash Terminal/);
  });

  test('cashier is denied admin-only surfaces', async ({ page }) => {
    await loginAs(page, CREDENTIALS.cashierEmail);

    for (const path of ['/menu', '/inventory', '/users', '/roles']) {
      await page.goto(path);
      await expect(page.getByText(/Unauthorized.*Required role/i)).toBeVisible();
    }
  });

  test('cashier is denied the kitchen display', async ({ page }) => {
    await loginAs(page, CREDENTIALS.cashierEmail);

    await page.goto('/kitchen');
    await expect(page.getByText(/Unauthorized.*Required role/i)).toBeVisible();
  });
});

test.describe('kitchen staff role access', () => {
  test('kitchen staff can open the kitchen display', async ({ page }) => {
    await loginAs(page, CREDENTIALS.kitchenEmail);

    await page.goto('/kitchen');
    await expect(page).toHaveTitle(/Kitchen Display System/);
  });

  test('kitchen staff is denied orders and pos', async ({ page }) => {
    await loginAs(page, CREDENTIALS.kitchenEmail);

    for (const path of ['/orders', '/pos']) {
      await page.goto(path);
      await expect(page.getByText(/Unauthorized.*Required role/i)).toBeVisible();
    }
  });

  test('kitchen staff is denied admin-only surfaces', async ({ page }) => {
    await loginAs(page, CREDENTIALS.kitchenEmail);

    for (const path of ['/menu', '/inventory', '/users', '/roles']) {
      await page.goto(path);
      await expect(page.getByText(/Unauthorized.*Required role/i)).toBeVisible();
    }
  });
});

test.describe('guest access control', () => {
  test('guests never reach any gated surface', async ({ page }) => {
    for (const path of ['/orders', '/pos', '/menu', '/inventory', '/users', '/roles', '/kitchen']) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login/);
    }
  });
});
