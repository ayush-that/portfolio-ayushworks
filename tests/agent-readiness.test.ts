/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test } from "bun:test";
import { preferredType } from "../src/lib/accept";
import { markdownForPath, notFoundMarkdown } from "../src/lib/markdown";
import {
  handleMcpMessage,
  mcpRegistryManifest,
  mcpServerCard,
  negotiateProtocolVersion,
  SERVER_INFO,
  TOOLS,
} from "../src/lib/mcp";
import { handleMcpHttp, mcpGetNotAllowed, serverCardResponse } from "../src/lib/mcp-http";
import { openApiSpec } from "../src/lib/openapi";
import config from "../src/config";

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
    for (const path of [
      "/",
      "/blog",
      "/projects",
      "/tags",
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

  test("developer portal names AyushWorks MCP, OpenAPI, and auth", () => {
    const md = markdownForPath("/developers")!;
    expect(md).toContain("# AyushWorks developer resources");
    expect(md).toContain("MCP server");
    expect(md).toContain("openapi.json");
    expect(md).toContain("auth.md");
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
    expect(markdownForPath("/blog/not-a-post")).toBeNull();
    expect(markdownForPath("/a/b/c")).toBeNull();
    const body = notFoundMarkdown("/nope");
    expect(body).toContain("404");
    expect(body).toContain("llms.txt");
    expect(body).toContain("sitemap.xml");
    expect(body).toContain("/developers");
  });
});

describe("public copy", () => {
  test("site config does not expose a personal phone field", () => {
    expect("phone" in config.social).toBe(false);
  });
});

describe("MCP handler", () => {
  const rpc = (method: string, params?: Record<string, unknown>) =>
    handleMcpMessage({ jsonrpc: "2.0", id: 1, method, params });

  test("initialize echoes the requested protocol version", () => {
    for (const version of ["2025-06-18", "2025-11-25", "2026-07-28"]) {
      const res = rpc("initialize", { protocolVersion: version }) as any;
      expect(res.result.protocolVersion).toBe(version);
    }
  });

  test("initialize defaults to 2025-11-25 when the version is unknown", () => {
    const res = rpc("initialize", { protocolVersion: "1999-01-01" }) as any;
    expect(res.result.protocolVersion).toBe("2025-11-25");
    expect(res.result.serverInfo.name).toBe(SERVER_INFO.name);
    expect(res.result.capabilities.tools).toBeDefined();
    expect(res.result.instructions).toContain(config.brandName);
  });

  test("notifications produce no response", () => {
    expect(handleMcpMessage({ jsonrpc: "2.0", method: "notifications/initialized" })).toBeNull();
  });

  test("tools/list returns every tool with a schema and read-only annotations", () => {
    const res = rpc("tools/list") as any;
    expect(res.result.tools).toHaveLength(TOOLS.length);
    for (const tool of res.result.tools) {
      expect(tool.inputSchema.type).toBe("object");
      expect(tool.annotations.readOnlyHint).toBe(true);
      expect(tool.annotations.destructiveHint).toBe(false);
    }
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

describe("MCP HTTP transport", () => {
  const initializeBody = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-11-25",
      capabilities: {},
      clientInfo: { name: "ora", version: "1" },
    },
  };

  test("POST initialize with JSON Accept returns JSON and echoes 2025-11-25", async () => {
    const res = await handleMcpHttp(
      new Request("https://ayushworks.com/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(initializeBody),
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(res.headers.get("mcp-protocol-version")).toBe("2025-11-25");
    const body = (await res.json()) as any;
    expect(body.result.protocolVersion).toBe("2025-11-25");
    expect(body.result.serverInfo.name).toBe("com.ayushworks/portfolio");
  });

  test("POST initialize with SSE Accept returns text/event-stream", async () => {
    const res = await handleMcpHttp(
      new Request("https://ayushworks.com/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify(initializeBody),
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/event-stream");
    const text = await res.text();
    expect(text).toStartWith("event: message");
    const dataLine = text.split("\n").find((line) => line.startsWith("data: "));
    const body = JSON.parse(dataLine!.slice(6));
    expect(body.jsonrpc).toBe("2.0");
    expect(body.id).toBe(1);
    expect(body.result.protocolVersion).toBe("2025-11-25");
  });

  test("notifications return 202 with an empty body", async () => {
    const res = await handleMcpHttp(
      new Request("https://ayushworks.com/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }),
      }),
    );
    expect(res.status).toBe(202);
    expect(await res.text()).toBe("");
  });

  test("GET is 405 JSON-RPC", async () => {
    const res = mcpGetNotAllowed(new Request("https://ayushworks.com/mcp"));
    expect(res.status).toBe(405);
    expect(res.headers.get("allow")).toContain("POST");
    const body = (await res.json()) as any;
    expect(body.error.code).toBe(-32000);
  });

  test("unsupported MCP-Protocol-Version header is 400", async () => {
    const res = await handleMcpHttp(
      new Request("https://ayushworks.com/mcp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "MCP-Protocol-Version": "nope",
        },
        body: JSON.stringify(initializeBody),
      }),
    );
    expect(res.status).toBe(400);
  });
});

describe("MCP discovery documents", () => {
  test("registry manifest has remotes, tools, and the Streamable HTTP URL", () => {
    const manifest = mcpRegistryManifest();
    expect(manifest.name).toBe("com.ayushworks/portfolio");
    expect(manifest.transport).toBe("streamable-http");
    expect(manifest.url).toBe("https://ayushworks.com/mcp");
    expect(manifest.remotes[0].url).toBe("https://ayushworks.com/mcp");
    expect(manifest.tools).toHaveLength(TOOLS.length);
  });

  test("server card has the fields Ora requires", () => {
    const card = mcpServerCard();
    expect(card.name).toBeTruthy();
    expect(card.description.length).toBeGreaterThan(40);
    expect(card.version).toBeTruthy();
    expect(card.serverUrl).toBe("https://ayushworks.com/mcp");
    expect(card.url).toBe("https://ayushworks.com/mcp");
    expect(card.transport).toBe("streamable-http");
    expect(card.tools.length).toBeGreaterThan(0);
    expect(card.remotes[0].supportedProtocolVersions).toContain("2025-11-25");
  });

  test("server card HTTP response is JSON", async () => {
    const res = serverCardResponse(new Request("https://ayushworks.com/.well-known/mcp"));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("application/json");
    const body = (await res.json()) as any;
    expect(body.serverUrl).toBe("https://ayushworks.com/mcp");
  });
});

describe("OpenAPI spec", () => {
  test("is OpenAPI 3.1 and names the AyushWorks MCP server", () => {
    const spec = openApiSpec() as any;
    expect(spec.openapi).toBe("3.1.0");
    expect(spec.info.title).toContain(config.brandName);
    expect(spec.paths["/mcp"].post.operationId).toBe("mcpJsonRpc");
    expect(spec.paths["/openapi.json"]).toBeDefined();
    expect(spec.paths["/developers"]).toBeDefined();
    expect(spec.paths["/auth.md"]).toBeDefined();
    expect(spec.components.schemas.Error.required).toContain("error");
  });
});

describe("negotiateProtocolVersion", () => {
  test("keeps supported versions and falls back otherwise", () => {
    expect(negotiateProtocolVersion("2025-11-25")).toBe("2025-11-25");
    expect(negotiateProtocolVersion("2025-06-18")).toBe("2025-06-18");
    expect(negotiateProtocolVersion(undefined)).toBe("2025-11-25");
    expect(negotiateProtocolVersion("nope")).toBe("2025-11-25");
  });
});
