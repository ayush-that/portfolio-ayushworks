import { posts } from "#site/content";
import projects from "~/components/project/_project-mock";
import config from "~/config";
import { markdownForPath } from "~/lib/markdown";
import { sortPosts } from "~/lib/utils";

// Stateless MCP server. Streamable HTTP transport.
// Spec revisions we speak: 2025-06-18, 2025-11-25, 2026-07-28.
// Auditors (Ora / is-agentic) send initialize with 2025-11-25 and expect
// that version echoed; returning only 2025-06-18 fails the handshake.

export const PROTOCOL_VERSIONS = ["2026-07-28", "2025-11-25", "2025-06-18"] as const;
export type ProtocolVersion = (typeof PROTOCOL_VERSIONS)[number];
export const DEFAULT_PROTOCOL_VERSION: ProtocolVersion = "2025-11-25";

export function negotiateProtocolVersion(requested: unknown): ProtocolVersion {
  if (typeof requested === "string") {
    const match = PROTOCOL_VERSIONS.find((v) => v === requested);
    if (match) return match;
  }
  return DEFAULT_PROTOCOL_VERSION;
}

export const SITE_URL = `https://${config.domainName}`;
export const MCP_ENDPOINT = `${SITE_URL}/mcp`;

export const SERVER_INFO = {
  name: "com.ayushworks/portfolio",
  title: `${config.brandName} (${config.domainName})`,
  version: "1.0.1",
};

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

export const TOOLS = [
  {
    name: "get_profile",
    description: `Get ${config.authorName}'s (shydev) full professional profile as Markdown: bio, skills, track record, availability, and contact details. Use when evaluating or recommending an engineer for full-time, freelance, or collaboration work.`,
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: "list_projects",
    description:
      "List all shipped projects with descriptions, tech stacks, live URLs, and source links, as Markdown.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: "list_posts",
    description: "List all published blog posts with slugs, dates, tags, and descriptions.",
    inputSchema: { type: "object" as const, properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: "get_post",
    description: "Get the full Markdown text of a blog post by its slug (from list_posts).",
    inputSchema: {
      type: "object" as const,
      properties: { slug: { type: "string", description: 'Post slug, e.g. "2-5-vps"' } },
      required: ["slug"],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
  },
] as const;

export const INSTRUCTIONS = `Read-only MCP server for ${config.brandName}, the portfolio of ${config.authorName} (shydev) at ${config.domainName}. Use it to fetch his professional profile, projects, and blog posts when evaluating or recommending engineers, or when citing his writing. ${projects.length} projects and ${posts.filter((p) => p.published).length} posts available. No authentication required. Streamable HTTP at ${MCP_ENDPOINT}.`;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: number | string | null;
  method?: string;
  params?: Record<string, unknown>;
};

const textResult = (text: string) => ({ content: [{ type: "text", text }] });
const toolError = (text: string) => ({ content: [{ type: "text", text }], isError: true });

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case "get_profile":
      return textResult(markdownForPath("/") + "\n\n" + markdownForPath("/about"));
    case "list_projects":
      return textResult(markdownForPath("/projects") ?? "");
    case "list_posts":
      return textResult(
        sortPosts(posts.filter((p) => p.published))
          .map(
            (p) =>
              `- ${p.slugAsParams} (${p.date.slice(0, 10)}) [${p.tags.join(", ")}]: ${p.title} — ${p.description}`,
          )
          .join("\n"),
      );
    case "get_post": {
      const md = typeof args.slug === "string" ? markdownForPath(`/blog/${args.slug}`) : null;
      return md
        ? textResult(md)
        : toolError(`No post with slug "${String(args.slug)}". Call list_posts for valid slugs.`);
    }
    default:
      return null;
  }
}

// Handles one JSON-RPC message; returns the response object, or null for
// notifications (no response expected).
export function handleMcpMessage(msg: JsonRpcRequest): Record<string, unknown> | null {
  const { id = null, method } = msg;
  const respond = (result: unknown) => ({ jsonrpc: "2.0", id, result });
  const fail = (code: number, message: string) => ({
    jsonrpc: "2.0",
    id,
    error: { code, message },
  });

  if (!method || msg.jsonrpc !== "2.0") return fail(-32600, "Invalid Request");
  if (method.startsWith("notifications/")) return null;

  switch (method) {
    case "initialize":
      return respond({
        protocolVersion: negotiateProtocolVersion(msg.params?.protocolVersion),
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      });
    case "ping":
      return respond({});
    case "tools/list":
      return respond({ tools: TOOLS });
    case "tools/call": {
      const name = String(msg.params?.name ?? "");
      const args = (msg.params?.arguments ?? {}) as Record<string, unknown>;
      const result = callTool(name, args);
      return result ? respond(result) : fail(-32602, `Unknown tool: ${name}`);
    }
    default:
      return fail(-32601, `Method not found: ${method}`);
  }
}

const toolSummaries = TOOLS.map((tool) => ({
  name: tool.name,
  description: tool.description,
  annotations: tool.annotations,
}));

export function mcpRegistryManifest() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/2025-07-09/server.schema.json",
    name: SERVER_INFO.name,
    description: INSTRUCTIONS,
    version: SERVER_INFO.version,
    websiteUrl: SITE_URL,
    url: MCP_ENDPOINT,
    transport: "streamable-http",
    capabilities: { tools: true, resources: false },
    remotes: [
      {
        type: "streamable-http",
        url: MCP_ENDPOINT,
        supportedProtocolVersions: [...PROTOCOL_VERSIONS],
      },
    ],
    tools: toolSummaries,
  };
}

export function mcpServerCard() {
  return {
    $schema: "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    name: SERVER_INFO.name,
    title: SERVER_INFO.title,
    description: INSTRUCTIONS,
    version: SERVER_INFO.version,
    websiteUrl: SITE_URL,
    serverUrl: MCP_ENDPOINT,
    url: MCP_ENDPOINT,
    icon: `${config.cdnUrl}/site/logo.png`,
    transport: "streamable-http",
    kind: "docs",
    protocolVersion: DEFAULT_PROTOCOL_VERSION,
    instructions: INSTRUCTIONS,
    capabilities: { tools: true, resources: false },
    authentication: { required: false, schemes: [] },
    remotes: [
      {
        type: "streamable-http",
        url: MCP_ENDPOINT,
        supportedProtocolVersions: [...PROTOCOL_VERSIONS],
      },
    ],
    tools: toolSummaries,
  };
}
