import { test, expect } from '@playwright/test';
import { seedDatabase } from './helpers';

test.beforeEach(() => {
  seedDatabase();
});

test('debug: inspect the customization area after clicking Add to Order', async ({ page }) => {
  await page.goto('/');
  
  // Click "Add to Order" on the first dish (Margherita)
  await page.getByRole('button', { name: 'Add to Order' }).first().click();
  
  // Wait a bit for any changes
  await page.waitForTimeout(1000);
  
  // Find all elements that contain the text "Customize"
  const customizeElements = page.getByText(/Customize/i);
  const customizeCount = await customizeElements.count();
  console.log(`Found ${customizeCount} elements with text matching /Customize/i`);
  for (let i = 0; i < customizeCount; i++) {
    const el = customizeElements.nth(i);
    const tagName = await el.evaluate(el => el.tagName);
    const className = await el.getAttribute('class');
    const role = await el.getAttribute('role');
    const innerText = await el.innerText();
    console.log(`  Element ${i}: tag=${tagName}, role=${role}, class=${className}, text="${innerText.substring(0, 100)}"`);
    // Also get the outerHTML of a snippet
    const outerHTML = await el.evaluate(el => el.outerHTML.substring(0, 500));
    console.log(`    outerHTML snippet: ${outerHTML}...`);
  }
  
  // Find all elements that contain the text "Pizza Size" or "Crust Preference"
  const sizeElements = page.getByText(/Pizza Size|Crust Preference/i);
  const sizeCount = await sizeElements.count();
  console.log(`Found ${sizeCount} elements with text matching /Pizza Size|Crust Preference/i`);
  for (let i = 0; i < sizeCount; i++) {
    const el = sizeElements.nth(i);
    const tagName = await el.evaluate(el => el.tagName);
    const className = await el.getAttribute('class');
    const role = await el.getAttribute('role');
    const innerText = await el.innerText();
    console.log(`  Element ${i}: tag=${tagName}, role=${role}, class=${className}, text="${innerText.substring(0, 100)}"`);
  }
  
  // Look for any button that contains the text "Add to Order" (maybe inside the customization area)
  const addToOrderButtons = page.getByRole('button', { name: /Add to Order/i });
  const addToOrderCount = await addToOrderButtons.count();
  console.log(`Found ${addToOrderCount} buttons with role=button and name matching /Add to Order/i`);
  for (let i = 0; i < addToOrderCount; i++) {
    const el = addToOrderButtons.nth(i);
    const tagName = await el.evaluate(el => el.tagName);
    const className = await el.getAttribute('class');
    const innerText = await el.innerText();
    console.log(`  Button ${i}: tag=${tagName}, class=${className}, text="${innerText}"`);
    // Check if this button is visible
    const isVisible = await el.isVisible();
    console.log(`    Visible: ${isVisible}`);
  }
  
  // Take a screenshot for reference
  await page.screenshot({ path: '/tmp/debug_customization_area.png' });
});