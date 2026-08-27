import { test, expect } from '@playwright/test';
import { seedDatabase } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('debug: see what is in the customization modal', async ({ page }) => {
  await page.goto('/');
  
  // Click "Add to Order" on the first dish (Margherita) to open the customization modal
  await page.getByRole('button', { name: 'Add to Order' }).first().click();
  
  // Wait for the modal to appear
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible({ timeout: 5000 });
  
  // Print all text inside the dialog
  const dialogText = await dialog.innerText();
  console.log('Dialog text:', dialogText);
  
  // Also get all buttons inside the dialog
  const buttons = await dialog.$$('button');
  for (let i = 0; i < buttons.length; i++) {
    const btnText = await buttons[i].innerText();
    console.log(`Button ${i}: '${btnText}'`);
  }
  
  // Take a screenshot for visual reference
  await page.screenshot({ path: '/tmp/debug_modal.png' });
});