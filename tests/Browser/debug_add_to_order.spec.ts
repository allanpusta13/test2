import { test, expect } from '@playwright/test';
import { seedDatabase } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('debug: see what happens after clicking Add to Order', async ({ page }) => {
  await page.goto('/');
  
  // Click "Add to Order" on the first dish (Margherita)
  await page.getByRole('button', { name: 'Add to Order' }).first().click();
  
  // Wait a bit for any changes
  await page.waitForTimeout(1000);
  
  // Check if there is any element with the text "Customize" (case insensitive)
  const customizeElements = page.getByText(/Customize/i);
  const count = await customizeElements.count();
  console.log(`Number of elements with text matching /Customize/i: ${count}`);
  
  // Check if there is any element with the text "Pizza Size" or "Crust Preference"
  const sizeElements = page.getByText(/Pizza Size|Crust Preference/i);
  const sizeCount = await sizeElements.count();
  console.log(`Number of elements with text matching /Pizza Size|Crust Preference/i: ${sizeCount}`);
  
  // Check if there is any dialog or modal role
  const dialogs = page.getByRole('dialog');
  const dialogCount = await dialogs.count();
  console.log(`Number of elements with role=dialog: ${dialogCount}`);
  
  // Check if there is any element with role=alertdialog
  const alertDialogs = page.getByRole('alertdialog');
  const alertDialogCount = await alertDialogs.count();
  console.log(`Number of elements with role=alertdialog: ${alertDialogCount}`);
  
  // Check if there is any element with class containing 'modal' or 'popover'
  const modalElements = page.locator('[class*="modal" i], [class*="popover" i]');
  const modalCount = await modalElements.count();
  console.log(`Number of elements with class containing modal or popover: ${modalCount}`);
  
  // Take a screenshot for reference
  await page.screenshot({ path: '/tmp/debug_after_add_to_order.png' });
  
  // Also, let's dump the innerHTML of the body for a small snippet (first 2000 chars) to see if there is any new structure
  const bodyHTML = await page.locator('body').innerHTML();
  console.log('Body HTML (first 2000 chars):', bodyHTML.substring(0, 2000));
});