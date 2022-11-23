import { expect, test } from '@playwright/test';

test('should navigate to empty page with domcontentloaded', async ({
  page,
}) => {
  await page.goto('localhost:3000/user/1');

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  expect(page.url()).toBe('localhost:3000/user/1');
});

// Path: playwright\tests\page.spec.ts
