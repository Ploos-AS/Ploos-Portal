import { test, expect } from '@playwright/test';

test('preview navigation and shared preferences', async ({ page }) => {
  await page.goto('/preview');
  await expect(page.getByRole('heading', { name: 'Oversikt', exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByRole('heading', { name: 'Demo forening' })).toBeVisible();
  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveAttribute('aria-pressed', 'true');
  const nav = page.getByRole('navigation', { name: 'Portal navigation' });
  for (const [name, path] of [['Organizations','organizations'], ['Services','products'], ['Catalog','catalog'], ['Subscriptions','subscriptions'], ['Members','members']]) {
    await nav.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp('/preview/' + path + '$'));
    await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('combobox', { name: 'Organization' })).toHaveValue('association');
    await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveAttribute('aria-pressed', 'true');
  }
});

test('health and disabled login', async ({ request }) => {
  const health = await request.get('/healthz');
  expect(health.status()).toBe(200);
  expect(await health.json()).toEqual({ status: 'ok' });
  expect((await request.get('/auth/login')).status()).toBe(503);
});

test('language and theme survive reload', async ({ page }) => {
  await page.goto('/preview');
  await page.getByRole('button', { name: 'English' }).click();
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Dark theme' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await page.getByRole('button', { name: 'Norsk' }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Oversikt', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mørkt tema' })).toHaveAttribute('aria-pressed', 'false');
});

test('mobile preview fits viewport and supports keyboard skip link', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/preview');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Hopp til innhold' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#preview-content')).toBeFocused();
  const nav = page.getByRole('navigation', { name: 'Portalmeny' });
  for (const name of ['Oversikt', 'Organisasjoner', 'Tjenester', 'Produktkatalog', 'Abonnementer', 'Medlemmer']) {
    await nav.getByRole('link', { name, exact: true }).click();
    await expect(nav.getByRole('link', { name, exact: true })).toHaveAttribute('aria-current', 'page');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});
