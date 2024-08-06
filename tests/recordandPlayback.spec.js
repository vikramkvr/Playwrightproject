import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com.au/');
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('prabhas kalki');
  await page.getByRole('search').getByRole('img').first().click();
  await page.getByLabel('Google Search').first().click();
  await page.goto('https://www.google.com.au/search?sca_esv=29daae17b33f96b8&cs=0&q=Event+Cinemas+George+Street&si=ACC90nyByJNAHfkzzi7l4JA4fcQKnJZTwFZjuiioX_pEpk9Ep6aOzM8YRIrYrFDaa8ilZZ56p2RtjlxbbSgYfd8m3Tw4L2XPj8rg9FXZq6EPpCWZADsGN-_tskaU-Uc_sTAfuaQN9ez9p-yAsD6FY7Mxl1oGzxr1Auz3sA0sMjVoq56rv9R297MnhiuB5i5_TtrzKdI5Go0BczKY1iIXV6-boXzb9vgH0_zmliodoNRTjAB3K5ZxwGE%3D&sa=X&ved=2ahUKEwjgyqCdg5KHAxVXh1YBHQiBAKUQySZ6BAhSEAs&biw=1280&bih=720&dpr=2');
  await page.getByRole('link', { name: 'George Street - Event Cinemas' }).click();
});