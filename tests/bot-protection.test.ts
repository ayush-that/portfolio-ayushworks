import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { isUnsolicitedAiCrawler } from "../src/lib/ai-crawler";
import { goneResponse } from "../src/lib/gone";
import { middleware } from "../src/middleware";

const robots = readFileSync(join(import.meta.dir, "../public/robots.txt"), "utf8");

describe("isUnsolicitedAiCrawler", () => {
  test.each([
    "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)",
    "ClaudeBot/1.0",
    "Mozilla/5.0 (compatible; Bytespider; https://zhanzhang.toutiao.com/)",
    "CCBot/2.0 (https://commoncrawl.org/faq/)",
    "Mozilla/5.0 (compatible; Google-Extended)",
    "meta-externalagent/1.1 (+https://developers.facebook.com/docs/sharing/webmasters/crawler)",
    "PerplexityBot/1.0",
    "ChatGPT-User",
  ])("blocks %s", (ua) => {
    expect(isUnsolicitedAiCrawler(ua)).toBe(true);
  });

  test.each([
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
    "Twitterbot/1.0",
    "LinkedInBot/1.0",
    "Slackbot-LinkExpanding 1.0",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36",
    null,
    "",
  ])("allows %s", (ua) => {
    expect(isUnsolicitedAiCrawler(ua)).toBe(false);
  });
});

describe("middleware", () => {
  test("returns 403 for GPTBot on HTML routes", () => {
    const res = middleware(
      new NextRequest("https://ayushworks.com/", {
        headers: { "user-agent": "GPTBot/1.2" },
      }),
    );
    expect(res.status).toBe(403);
  });

  test("does not rewrite Accept: text/markdown", () => {
    const res = middleware(
      new NextRequest("https://ayushworks.com/blog", {
        headers: { accept: "text/markdown" },
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
  });

  test("lets Googlebot through", () => {
    const res = middleware(
      new NextRequest("https://ayushworks.com/", {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
      }),
    );
    expect(res.status).toBe(200);
  });
});

describe("goneResponse", () => {
  test("is a noindex 404", () => {
    const res = goneResponse();
    expect(res.status).toBe(404);
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
  });
});

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
