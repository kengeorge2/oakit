import { test, expect } from '@playwright/test';

test.describe('Auth Handoff', () => {
  test('redirects to login when no token', async ({ page }) => {
    await page.goto('/dashboard');
    // Unauthenticated dashboard should redirect to /auth/login
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('verify page shows error for invalid token', async ({ page }) => {
    await page.goto('/auth/verify?token=invalid-token');
    await expect(page.locator('text=Invalid or expired')).toBeVisible({ timeout: 15000 });
  });

  test('verify page shows error when no token', async ({ page }) => {
    await page.goto('/auth/verify');
    await expect(page.locator('text=No verification token provided')).toBeVisible();
  });
});

test.describe('Checkout Guard', () => {
  test('checkout page redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/dashboard/checkout');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
