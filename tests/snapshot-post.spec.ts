import { expect, test } from "@playwright/test";

test("投稿ページ表示が崩れていない", async ({ page }) => {
  await page.goto("/diary/k-y-o-t-o.html");
  await expect(page.locator("body")).toHaveScreenshot({ maxDiffPixels: 100 });
});
