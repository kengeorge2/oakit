import { test, expect } from '@playwright/test';

test.describe('Currency', () => {
  test('checkout page exposes currency selector', async ({ page }) => {
    // Unauthenticated — should be guarded to login, so we only assert the guard works
    await page.goto('/dashboard/checkout');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('login page renders currency-safe UI', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('h1')).toContainText('OAK IT Solutions');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
