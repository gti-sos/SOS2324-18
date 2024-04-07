// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:10000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2324-18/);
});

test('Mínimo 10 registros', async ({ page }) => {
    await page.goto('http://localhost:10000/eu-solidarity-funds');
  
    let loadButton = await page.locator('.load');
    await loadButton.click();
    await page.waitForTimeout(2000);
    let fundsCount = (await page.locator('.fundItem').all()).length;
  
    // Expects page to have a heading with the name of Installation.
    expect(fundsCount).toBeGreaterThan(9);
  });
