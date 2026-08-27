import { execSync } from 'child_process';
import { type Page } from '@playwright/test';

export const CREDENTIALS = {
  password: 'password123',
  adminEmail: 'elena@artisanbistro.com',
  cashierEmail: 'sophia@artisanbistro.com',
  kitchenEmail: 'luigi@artisanbistro.com',
} as const;

export function seedDatabase(): void {
  execSync('php artisan migrate:fresh --seed', {
    cwd: process.cwd(),
    timeout: 30_000,
    stdio: 'pipe',
  });
}

export async function loginAs(page: Page, email: string): Promise<void> {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Staff Email Address' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(CREDENTIALS.password);
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Authenticate & Enter Workspace' }).click();
  // Wait for navigation away from login OR for page content to change (403 etc.)
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1_000);
}
