import { expect, test } from '@playwright/test';

test('should navigate to empty page with domcontentloaded', async ({
  page,
}) => {
  await page.goto('localhost:3000/');

  expect(page.url()).toBe('localhost:3000/');
});

// Path: playwright\tests\page.spec.ts
