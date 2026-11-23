import { test, expect, type Page } from '@playwright/test';

const BASE = '/chat-alerts-docs/';
const PAGES = [
  { path: '', h1: 'Jira updates, right in your team chat.', lang: 'en', doc: false },
  { path: 'setup/', h1: 'Setup guide', lang: 'en', doc: true },
  { path: 'huong-dan/', h1: 'Hướng dẫn cài đặt', lang: 'vi', doc: true },
  { path: 'privacy/', h1: 'Privacy Policy', lang: 'en', doc: true },
];

/** Finds an element by a "#id" hash; ids such as "1-install" are not valid CSS selectors. */
const byId = (page: Page, hash: string) => page.locator(`[id="${hash.slice(1).replace(/"/g, '\\"')}"]`);

/** Opens a page and fails the test on any console error, page error or failed request. */
async function open(page: Page, path: string) {
  const problems: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => problems.push(`failed: ${r.url()}`));
  page.on('response', (r) => { if (r.status() >= 400) problems.push(`${r.status()}: ${r.url()}`); });
  const res = await page.goto(path, { waitUntil: 'load' });
  expect(res?.status(), `status of /${path}`).toBe(200);
  return problems;
}

for (const p of PAGES) {
  test.describe(`/${p.path}`, () => {
    test('loads with title, heading, language and no errors', async ({ page }) => {
      const problems = await open(page, p.path);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(p.h1);
      await expect(page).toHaveTitle(/Chat Alerts for Jira|Setup guide|Hướng dẫn|Privacy/);
      await expect(page.locator('html')).toHaveAttribute('lang', p.lang);
      await expect(page.locator('meta[name="viewport"]')).toHaveCount(1);
      await expect(page.locator('link[rel="stylesheet"]')).toHaveCount(1);
      // The stylesheet really applied (custom header is sticky).
      expect(await page.locator('.site-header').evaluate((e) => getComputedStyle(e).position)).toBe('sticky');
      expect(problems).toEqual([]);
    });

    test('has no horizontal scroll', async ({ page }) => {
      await open(page, p.path);
      const { scroll, width } = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        width: window.innerWidth,
      }));
      expect(scroll).toBeLessThanOrEqual(width);
    });

    test('loads nothing from other sites', async ({ page }) => {
      const external: string[] = [];
      page.on('request', (r) => {
        const u = new URL(r.url());
        if (u.hostname !== 'localhost' && u.protocol !== 'data:') external.push(r.url());
      });
      await open(page, p.path);
      expect(external).toEqual([]);
    });

    test('header nav and footer are present', async ({ page }) => {
      await open(page, p.path);
      const nav = page.getByRole('navigation', { name: 'Main' });
      await expect(nav.getByRole('link')).toHaveCount(3);
      await expect(page.locator('.site-footer')).toContainText('Mekong Apps');
      if (p.path) await expect(nav.locator('[aria-current="page"]')).toHaveAttribute('href', BASE + p.path);
      else await expect(nav.locator('[aria-current="page"]')).toHaveCount(0);
    });

    test('skip link moves to the main content', async ({ page, isMobile }) => {
      test.skip(isMobile, 'keyboard only');
      await open(page, p.path);
      await page.keyboard.press('Tab');
      const skip = page.locator('a.skip');
      await expect(skip).toBeFocused();
      await expect(skip).toBeInViewport();
      await expect(skip).toHaveAttribute('href', '#main');
      await expect(page.locator('main#main')).toHaveCount(1);
    });

    if (p.doc) {
      test('table of contents lists every section and links work', async ({ page, isMobile }) => {
        await open(page, p.path);
        const toc = page.locator('aside.toc');
        await expect(toc).toBeVisible();
        const headings = await page.locator('.prose h2').allTextContents();
        expect(headings.length).toBeGreaterThanOrEqual(3);
        const links = toc.locator('.toc-list a');
        await expect(links).toHaveText(headings);
        // Collapsed on phones, open on desktop.
        const details = toc.locator('details');
        if (isMobile) {
          await expect(details).not.toHaveAttribute('open');
          await toc.locator('summary').click();
        }
        await expect(links.first()).toBeVisible();
        const last = links.last();
        const target = (await last.getAttribute('href'))!;
        await last.click();
        await expect.poll(() => decodeURIComponent(new URL(page.url()).hash)).toBe(target);
        await expect(byId(page, target)).toBeInViewport();
      });
    }
  });
}

test('every internal link and anchor resolves', async ({ page, request }) => {
  const seen = new Map<string, number>();
  for (const p of PAGES) {
    await page.goto(p.path);
    const hrefs = await page.$$eval('a[href], link[href], script[src], img[src]', (els) =>
      els.map((e) => (e as HTMLAnchorElement).href || (e as HTMLScriptElement).src),
    );
    for (const href of hrefs) {
      const u = new URL(href);
      if (u.hostname !== 'localhost' && u.hostname !== 'vtpqui3009.github.io') continue;
      // Canonical links point at the live site; check the same path locally.
      const local = `http://localhost:${new URL(page.url()).port}${u.pathname}`;
      if (!seen.has(local)) seen.set(local, (await request.get(local)).status());
      expect(seen.get(local), `${href} on /${p.path}`).toBe(200);
      if (u.hash && u.pathname === new URL(page.url()).pathname) {
        await expect(byId(page, decodeURIComponent(u.hash)), `anchor ${u.hash} on /${p.path}`).toHaveCount(1);
      }
    }
  }
  expect(seen.size).toBeGreaterThan(5);
});

test('old addresses still work', async ({ request }) => {
  for (const path of ['', 'setup/', 'huong-dan/', 'privacy/']) {
    expect((await request.get(BASE + path)).status(), path).toBe(200);
  }
});

test('home page shows the chat example and the docs cards', async ({ page }) => {
  await open(page, '');
  await expect(page.locator('.chat .msg')).toHaveCount(3);
  await expect(page.locator('.cards').first().locator('.card')).toHaveCount(6);
  const docs = page.locator('a.card-link');
  await expect(docs).toHaveCount(3);
  await docs.nth(1).click();
  await expect(page).toHaveURL(/\/huong-dan\/$/);
  await expect(page.locator('h1')).toHaveText('Hướng dẫn cài đặt');
});

test('setup guide keeps its troubleshooting table readable', async ({ page }) => {
  await open(page, 'setup/');
  const table = page.locator('.prose table');
  await expect(table).toHaveCount(1);
  await expect(table.locator('tbody tr')).toHaveCount(6);
  const box = await table.boundingBox();
  const vw = page.viewportSize()!.width;
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(vw);
});

test('colours follow the light or dark setting', async ({ page }, info) => {
  await open(page, '');
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const [r, g, b] = bg.match(/\d+/g)!.map(Number);
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (info.project.use.colorScheme === 'dark') expect(luminance).toBeLessThan(0.2);
  else expect(luminance).toBeGreaterThan(0.9);
  // Body text stays readable against the background.
  const fg = await page.evaluate(() => getComputedStyle(document.body).color);
  const [fr, fgG, fb] = fg.match(/\d+/g)!.map(Number);
  const fgLum = (0.2126 * fr + 0.7152 * fgG + 0.0722 * fb) / 255;
  expect(Math.abs(fgLum - luminance)).toBeGreaterThan(0.6);
});

test('phone layout stacks sections in one column', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone only');
  await open(page, '');
  const cols = await page.locator('.cards').first().evaluate((e) => getComputedStyle(e).gridTemplateColumns.split(' ').length);
  expect(cols).toBe(1);
  const tap = await page.locator('.btn-primary').boundingBox();
  expect(tap!.height).toBeGreaterThanOrEqual(40);
});
