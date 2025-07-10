import { expect, test } from "@playwright/test";

test("投稿ページに遷移できる", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: "Astro v5にアップグレードする他" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Astro v5にアップグレードする他",
  );
});
