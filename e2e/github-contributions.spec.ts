import { expect, test } from "@playwright/test";

const api = "https://github-contributions-api.jogruber.de/v4/ayush-that?y=last";
const blocks = "rect[data-date]";

test("refreshes a static export on each visit without rebuilding", async ({ page }) => {
  let date = "2099-10-23";
  let count = 17;
  await page.route(api, (route) =>
    route.fulfill({
      json: { contributions: [{ date, count, level: 2 }] },
    }),
  );

  await page.goto("/");
  await expect(page.locator(`${blocks}[data-date='${date}']`)).toBeVisible();
  await expect(page.getByText("17 contributions in the last year", { exact: true })).toBeVisible();

  date = "2099-10-24";
  count = 23;
  await page.reload();
  const latest = page.locator(`${blocks}[data-date='${date}']`);
  await expect(latest).toBeVisible();
  await latest.focus();
  await expect(page.getByRole("tooltip")).toContainText("23 contributions");
  await expect(page.getByText("23 contributions in the last year", { exact: true })).toBeVisible();
});

for (const failure of ["http", "network", "empty", "malformed"]) {
  test(`preserves the static fallback on ${failure} failure`, async ({ page, request }) => {
    const html = await (await request.get("/")).text();
    const dates = [...html.matchAll(/data-date="([\d-]+)"/g)].map((match) => match[1]);
    expect(dates.length).toBeGreaterThan(0);
    const lastBuiltDate = dates.at(-1);
    await page.route(api, (route) => {
      if (failure === "network") return route.abort();
      if (failure === "http") return route.fulfill({ status: 503 });
      return route.fulfill({ json: { contributions: failure === "empty" ? [] : null } });
    });
    await page.goto("/");
    await expect(page.locator(blocks).last()).toHaveAttribute("data-date", lastBuiltDate!);
    await expect(page.locator(blocks)).toHaveCount(dates.length);
  });
}
