const { test, expect } = require('@playwright/test');

test('English Quest loads without uncaught page errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toBeVisible();
  expect(errors).toEqual([]);
});

test('unified five-button navigation exists and is clickable', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const nav = page.locator('#eq-unified-nav-20260920');
  await expect(nav).toBeVisible();
  const labels = ['首頁', '地圖', '衣櫥', '寵物', '我的'];
  for (const label of labels) {
    const button = nav.getByRole('button', { name: new RegExp(label) });
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  }
  await expect(nav.locator('button')).toHaveCount(5);
});

test('main game feature entries are present', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const body = page.locator('body');
  for (const label of ['文法筆記', '錯題本', '文法大會考', '字彙大會考']) {
    await expect(body).toContainText(label);
  }
});

test('navigation buttons do not overlap each other', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const buttons = page.locator('#eq-unified-nav-20260920 button');
  await expect(buttons).toHaveCount(5);
  const boxes = await buttons.evaluateAll(els => els.map(el => {
    const r = el.getBoundingClientRect();
    return { left:r.left, right:r.right, top:r.top, bottom:r.bottom, width:r.width, height:r.height };
  }));
  for (const b of boxes) {
    expect(b.width).toBeGreaterThan(20);
    expect(b.height).toBeGreaterThan(20);
  }
  for (let i=0;i<boxes.length-1;i++) {
    expect(boxes[i].right).toBeLessThanOrEqual(boxes[i+1].left + 1);
  }
});
