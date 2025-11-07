import { test } from '@playwright/test';

test.describe('RFQ to Order Journey', () => {
  test.skip(
    true,
    'End-to-end journey requires seeded backend and is covered by integration environment.',
  );

  test('buyer can create RFQ and complete wallet payment', async ({ page }) => {
    await page.goto('/en/auth/signin');
    // TODO: Implement full end-to-end happy path once QA environment is available.
  });
});
