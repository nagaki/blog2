import { expect, test } from "@playwright/test";

test("ホーム画面でタイトルが表示される", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTitle("ALLAURMONO")).toBeVisible();
});
