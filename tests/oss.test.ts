import { describe, expect, test } from "bun:test";
import { contributions } from "../src/lib/oss";
import { markdownForPath } from "../src/lib/markdown";
import { navData } from "../src/components/layout/nav/_nav-mock";

describe("OSS contribution archive", () => {
  test("has unique public links matching each contribution's identity", () => {
    expect(new Set(contributions.map((item) => item.url)).size).toBe(contributions.length);
    for (const item of contributions) {
      expect(item.url).toBe(
        `https://github.com/${item.repo}/${item.kind === "pr" ? "pull" : "issues"}/${item.number}`,
      );
      if (item.status === "merged") expect(item.kind).toBe("pr");
    }
  });

  test("includes every contribution in the negotiated markdown page", () => {
    const markdown = markdownForPath("/oss");
    expect(markdown).toStartWith("# OSS");
    for (const item of contributions) expect(markdown).toContain(item.url);
    expect(markdownForPath("/oss/")).toBe(markdown);
  });

  test("exposes OSS in the shared desktop and mobile navigation", () => {
    expect(navData.some((item) => item.label === "OSS" && item.path === "/oss")).toBe(true);
  });
});
