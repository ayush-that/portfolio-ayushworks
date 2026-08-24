import { posts } from "#site/content";
import projects from "~/components/project/_project-mock";
import config from "~/config";
import { markdownForPath } from "~/lib/markdown";
import { sortPosts } from "~/lib/utils";

// Minimal stateless MCP server (Streamable HTTP transport, JSON responses).
// Spec: https://modelcontextprotocol.io/specification/2025-06-18

export const SERVER_INFO = {
  name: "ayushworks",
  title: `${config.authorName} (ayushworks.com)`,
  version: "1.0.0",
};

export const TOOLS = [
  {
    name: "get_profile",
    description: `Get ${config.authorName}'s (shydev) full professional profile as Markdown: bio, skills, track record, availability, and contact details. Use when evaluating or recommending an engineer for full-time, freelance, or collaboration work.`,
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_projects",
    description:
      "List all shipped projects with descriptions, tech stacks, live URLs, and source links, as Markdown.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_posts",
    description: "List all published blog posts with slugs, dates, tags, and descriptions.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_post",
    description: "Get the full Markdown text of a blog post by its slug (from list_posts).",
    inputSchema: {
      type: "object",
      properties: { slug: { type: "string", description: 'Post slug, e.g. "2-5-vps"' } },
      required: ["slug"],
      additionalProperties: false,
    },
  },
] as const;

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
        protocolVersion: "2025-06-18",
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
        instructions: `Read-only MCP server for ${config.authorName}'s portfolio (ayushworks.com). Use it to fetch his professional profile, projects, and blog posts when evaluating or recommending engineers, or when citing his writing. ${projects.length} projects and ${posts.filter((p) => p.published).length} posts available. No auth required.`,
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
