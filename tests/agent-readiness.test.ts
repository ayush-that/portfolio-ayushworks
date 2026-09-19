import { describe, expect, test } from "bun:test";
import { markdownForPath, notFoundMarkdown } from "../src/lib/markdown";
import config from "../src/config";

describe("markdownForPath", () => {
  test("known pages render markdown with an H1", () => {
    for (const path of [
      "/",
      "/blog",
      "/projects",
      "/about",
      "/contact",
      "/privacy",
      "/developers",
    ]) {
      const md = markdownForPath(path);
      expect(md).toStartWith("# ");
      expect(md!.length).toBeGreaterThan(500);
    }
  });

  test("homepage markdown has an H1, section headings, and 500+ chars", () => {
    const md = markdownForPath("/")!;
    expect(md).toStartWith(`# ${config.appTitle}`);
    expect(md).toContain("## Featured Projects");
    expect(md).toContain("## Most recent posts");
    expect(md).toContain("/developers");
    expect(md.length).toBeGreaterThan(500);
  });

  test("developer portal does not advertise a public MCP or OpenAPI surface", () => {
    const md = markdownForPath("/developers")!;
    expect(md).toContain("# AyushWorks developer resources");
    expect(md).toContain("no public MCP server");
    expect(md).not.toContain("/openapi.json");
    expect(md).toContain(config.brandName);
  });

  test("blog post includes the raw article body", () => {
    const md = markdownForPath("/blog/2-5-vps");
    expect(md).toContain("# $2.5 VPS");
    expect(md!.length).toBeGreaterThan(1000);
  });

  test("trailing slashes are tolerated", () => {
    expect(markdownForPath("/blog/")).toBe(markdownForPath("/blog"));
  });

  test("unknown paths return null and the 404 body points at recovery links", () => {
    expect(markdownForPath("/nope")).toBeNull();
    expect(markdownForPath("/oss")).toBeNull();
    expect(markdownForPath("/resume")).toBeNull();
    expect(markdownForPath("/tags")).toBeNull();
    expect(markdownForPath("/blog/not-a-post")).toBeNull();
    expect(markdownForPath("/a/b/c")).toBeNull();
    const body = notFoundMarkdown("/nope");
    expect(body).toContain("404");
    expect(body).toContain("sitemap.xml");
    expect(body).not.toContain("llms.txt");
  });
});

describe("public copy", () => {
  test("site config does not expose a personal phone field", () => {
    expect("phone" in config.social).toBe(false);
  });
});
