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
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), { message: `Horizontal overflow on ${name}` }).toBeLessThanOrEqual(0);
  }
});

test('domain preview filters fictional portfolio by organization', async ({ page }) => {
  await page.goto('/preview/products');
  await page.getByRole('link', { name: 'Se domeneoversikt' }).click();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByRole('heading', { name: 'demo-association.example' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('empty');
  await expect(page.getByText('Ingen domener i valgt demoorganisasjon.')).toBeVisible();
});

test('DNS preview filters zones by organization', async ({ page }) => {
  await page.goto('/preview/products');
  await page.getByRole('link', { name: 'Se DNS-soner' }).click();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'AAAA', exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByRole('heading', { name: 'demo-association.example' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('empty');
  await expect(page.getByText('Ingen DNS-soner i valgt demoorganisasjon.')).toBeVisible();
});

test('hosting preview supports multiple domain arrangements', async ({ page }) => {
  await page.goto('/preview/products');
  await page.getByRole('link', { name: 'Se webhotell' }).click();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByText('Delegert subdomene', { exact: true })).toBeVisible();
  await expect(page.getByText('Ekstern DNS', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('empty');
  await expect(page.getByText('Ingen webhotell i valgt demoorganisasjon.')).toBeVisible();
});

test('mail preview separates mailboxes and filters organizations', async ({ page }) => {
  await page.goto('/preview/products');
  await page.getByRole('link', { name: 'Se e-posttjenester' }).click();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Delte postkasser' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByRole('heading', { name: 'sirdal.seniornett.example' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'demo-business.example' })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('empty');
  await expect(page.getByText('Ingen e-posttjenester i valgt demoorganisasjon.')).toBeVisible();
});

test('cloud preview filters instances and shows planned tracks', async ({ page }) => {
  await page.goto('/preview/products');
  await page.getByRole('link', { name: 'Se skytjenester' }).click();
  await expect(page.getByText('cloud.demo-business.example', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'kSuite', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Proton', exact: true })).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByText('cloud.sirdal.seniornett.example', { exact: true })).toBeVisible();
  await expect(page.getByText('cloud.demo-business.example', { exact: true })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('empty');
  await expect(page.getByText('Ingen skytjenester i valgt demoorganisasjon.')).toBeVisible();
});

test('Forenio preview distinguishes association eligibility and roles', async ({ page }) => {
  await page.goto('/preview/products');
  await page.getByRole('link', { name: 'Se Forenio' }).click();
  await expect(page.getByText('Tilknytning er beregnet på foreninger.')).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('association');
  await expect(page.getByText('Eier eller administrator må be om tilknytning.')).toBeVisible();
  await page.getByRole('combobox', { name: 'Organisasjon' }).selectOption('empty');
  await expect(page.getByText('Kan be om tilknytning når integrasjonen er tilgjengelig.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Koble til Forenio (ikke aktivert)' })).toBeDisabled();
});
