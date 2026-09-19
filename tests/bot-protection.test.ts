import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const robots = readFileSync(join(import.meta.dir, "../public/robots.txt"), "utf8");

describe("robots.txt", () => {
  test("keeps a default allow for search engines and publishes the sitemap", () => {
    expect(robots).toContain("User-agent: *\nAllow: /");
    expect(robots).not.toContain("User-agent: Googlebot\nDisallow: /");
    expect(robots).not.toContain("User-agent: Bingbot\nDisallow: /");
    expect(robots).toContain("Sitemap: https://ayushworks.com/sitemap.xml");
  });

  test("disallows major AI crawlers from the whole site", () => {
    for (const agent of ["GPTBot", "ClaudeBot", "Bytespider", "CCBot", "Google-Extended"]) {
      const block = robots.split("\n\n").find((section) => section.includes(`User-agent: ${agent}`));
      expect(block).toBeDefined();
      expect(block).toContain("Disallow: /");
    }
  });

  test("hides markdown, MCP, and OpenAPI from generic crawlers", () => {
    expect(robots).toContain("Disallow: /md");
    expect(robots).toContain("Disallow: /mcp");
    expect(robots).toContain("Disallow: /openapi.json");
  });
});
