// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:10000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/SOS2324-28/);
});

test('List Foods', async ({ page }) => {
  await page.goto('http://localhost:10000/foods-prices-inflation');

  await page.waitForTimeout(2000);
  let foodCount = (await page.locator('.foodItem').all()).length;

  // Expects page to have a heading with the name of Installation.
  expect(foodCount).toBeGreaterThan(0);
});
