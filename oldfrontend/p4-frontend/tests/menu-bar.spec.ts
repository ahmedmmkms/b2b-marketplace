import { test, expect } from '@playwright/test';

test.describe('Menu Bar Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');
  });

  test('should have a working menu bar with RFQ and Orders links', async ({ page }) => {
    // Check if the menu bar exists
    await expect(page.locator('nz-header')).toBeVisible();
    
    // Check if all menu items are present
    await expect(page.locator('li[nz-menu-item] a:has-text("Home")')).toBeVisible();
    await expect(page.locator('li[nz-menu-item] a:has-text("Catalog")')).toBeVisible();
    await expect(page.locator('li[nz-menu-item] a:has-text("RFQ")')).toBeVisible();
    await expect(page.locator('li[nz-menu-item] a:has-text("Orders")')).toBeVisible();
  });

  test('should navigate to RFQ page when RFQ link is clicked', async ({ page }) => {
    // Click on the RFQ link
    await page.locator('li[nz-menu-item] a:has-text("RFQ")').click();
    
    // Wait for navigation
    await page.waitForURL('**/rfq');
    
    // Check if we're on the RFQ page
    await expect(page).toHaveURL(/.*rfq/);
    await expect(page.locator('nz-page-header')).toContainText('Request for Quotation');
  });

  test('should navigate to Orders page when Orders link is clicked', async ({ page }) => {
    // Click on the Orders link
    await page.locator('li[nz-menu-item] a:has-text("Orders")').click();
    
    // Wait for navigation
    await page.waitForURL('**/orders');
    
    // Check if we're on the Orders page
    await expect(page).toHaveURL(/.*orders/);
    await expect(page.locator('nz-page-header')).toContainText('My Orders');
  });

  test('should navigate to Catalog page when Catalog link is clicked', async ({ page }) => {
    // Click on the Catalog link
    await page.locator('li[nz-menu-item] a:has-text("Catalog")').click();
    
    // Wait for navigation
    await page.waitForURL('**/catalog');
    
    // Check if we're on the Catalog page
    await expect(page).toHaveURL(/.*catalog/);
    await expect(page.locator('nz-page-header')).toContainText('Product Catalog');
  });

  test('should navigate to Home page when Home link is clicked', async ({ page }) => {
    // Click on the Catalog link first to change the page
    await page.locator('li[nz-menu-item] a:has-text("Catalog")').click();
    await page.waitForURL('**/catalog');
    
    // Now click on the Home link
    await page.locator('li[nz-menu-item] a:has-text("Home")').click();
    
    // Wait for navigation
    await page.waitForURL('**/');
    
    // Check if we're on the Home page
    await expect(page).toHaveURL(/.*\/$/);
    await expect(page.locator('h1')).toContainText('Welcome');
  });
});