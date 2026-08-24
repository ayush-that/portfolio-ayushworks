/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "bun:test";
import { preferredType } from "../src/lib/accept";
import { markdownForPath, notFoundMarkdown } from "../src/lib/markdown";
import { handleMcpMessage, TOOLS } from "../src/lib/mcp";

describe("preferredType (acceptmarkdown.com test vectors)", () => {
  test.each([
    ["text/markdown", "text/markdown"],
    ["text/markdown, text/html;q=0.8", "text/markdown"],
    ["text/html", "text/html"],
    ["text/markdown;q=0, text/html", "text/html"],
    ["text/markdown;q=0", null],
    ["*/*", "text/html"],
    // real Chrome header must not match the markdown branch
    [
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "text/html",
    ],
    // specific rejection overrides wildcard
    ["text/html;q=0, */*;q=1", "text/markdown"],
    ["application/json", null],
    ["text/*", "text/html"],
  ])("Accept: %s → %s", (header, expected) => {
    expect(preferredType(header)).toBe(expected);
  });

  test("missing Accept header serves the default", () => {
    expect(preferredType(null)).toBe("text/html");
    expect(preferredType("")).toBe("text/html");
  });
});

describe("markdownForPath", () => {
  test("known pages render markdown with an H1", () => {
    for (const path of ["/", "/blog", "/projects", "/tags", "/about", "/contact", "/privacy"]) {
      const md = markdownForPath(path);
      expect(md).toStartWith("# ");
      expect(md!.length).toBeGreaterThan(500);
    }
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
    expect(markdownForPath("/blog/not-a-post")).toBeNull();
    expect(markdownForPath("/a/b/c")).toBeNull();
    const body = notFoundMarkdown("/nope");
    expect(body).toContain("404");
    expect(body).toContain("llms.txt");
    expect(body).toContain("sitemap.xml");
  });
});

describe("MCP handler", () => {
  const rpc = (method: string, params?: Record<string, unknown>) =>
    handleMcpMessage({ jsonrpc: "2.0", id: 1, method, params });

  test("initialize advertises tools and server info", () => {
    const res = rpc("initialize", { protocolVersion: "2025-06-18" }) as any;
    expect(res.result.protocolVersion).toBe("2025-06-18");
    expect(res.result.serverInfo.name).toBe("ayushworks");
    expect(res.result.capabilities.tools).toBeDefined();
  });

  test("notifications produce no response", () => {
    expect(handleMcpMessage({ jsonrpc: "2.0", method: "notifications/initialized" })).toBeNull();
  });

  test("tools/list returns every tool with a schema", () => {
    const res = rpc("tools/list") as any;
    expect(res.result.tools).toHaveLength(TOOLS.length);
    for (const tool of res.result.tools) expect(tool.inputSchema.type).toBe("object");
  });

  test("tools/call works for each tool", () => {
    for (const name of ["get_profile", "list_projects", "list_posts"]) {
      const res = rpc("tools/call", { name, arguments: {} }) as any;
      expect(res.result.content[0].text.length).toBeGreaterThan(100);
      expect(res.result.isError).toBeUndefined();
    }
    const post = rpc("tools/call", { name: "get_post", arguments: { slug: "2-5-vps" } }) as any;
    expect(post.result.content[0].text).toContain("$2.5 VPS");
  });

  test("bad tool calls fail gracefully", () => {
    const missing = rpc("tools/call", { name: "get_post", arguments: { slug: "nope" } }) as any;
    expect(missing.result.isError).toBe(true);
    const unknown = rpc("tools/call", { name: "nope", arguments: {} }) as any;
    expect(unknown.error.code).toBe(-32602);
  });

  test("unknown methods and malformed messages return JSON-RPC errors", () => {
    expect((rpc("resources/list") as any).error.code).toBe(-32601);
    expect((handleMcpMessage({}) as any).error.code).toBe(-32600);
  });
});
