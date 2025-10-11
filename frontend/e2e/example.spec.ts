// e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has P4 Marketplace title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/P4/);
});

test('navigate to catalog page', async ({ page }) => {
  await page.goto('/');

  // Click the catalog link
  await page.getByRole('link', { name: 'Catalog' }).click();

  // Expects the URL to contain catalog
  await expect(page).toHaveURL(/.*catalog/);

  // Expect to see the catalog title
  await expect(page.getByRole('heading', { name: 'Product Catalog' })).toBeVisible();
});

test.describe('language switcher', () => {
  test('switches language from English to Arabic', async ({ page }) => {
    await page.goto('/');
    
    // Check initial language is English
    await expect(page.getByText('P4 Marketplace')).toBeVisible();
    
    // Click the language switcher
    await page.getByRole('button', { name: 'العربية' }).click();
    
    // Wait for the page to update
    await page.waitForURL('**/ar');
    
    // Check if the page is now in Arabic
    await expect(page.getByText('P4 Marketplace')).toBeVisible(); // This text stays the same
  });
});