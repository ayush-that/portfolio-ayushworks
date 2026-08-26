import config from "~/config";
import { MCP_ENDPOINT, SITE_URL, TOOLS } from "~/lib/mcp";

const errorSchema = {
  type: "object" as const,
  required: ["error"],
  properties: {
    error: {
      type: "object",
      required: ["code", "message"],
      properties: {
        code: { type: "string", description: "Machine-readable error code" },
        message: { type: "string", description: "Human-readable error message" },
        hint: { type: "string", description: "How to recover" },
      },
    },
  },
};

const jsonRpcError = {
  type: "object" as const,
  required: ["jsonrpc", "error"],
  properties: {
    jsonrpc: { type: "string", const: "2.0" },
    id: { type: ["string", "number", "null"] },
    error: {
      type: "object",
      required: ["code", "message"],
      properties: {
        code: { type: "integer" },
        message: { type: "string" },
      },
    },
  },
};

export function openApiSpec() {
  return {
    openapi: "3.1.0",
    info: {
      title: `${config.brandName} public API`,
      summary: `Machine-readable surfaces for ${config.authorName}'s portfolio at ${config.domainName}.`,
      description: `${config.brandName} is the public site of ${config.authorName} (shydev). This spec covers the unauthenticated HTTP surfaces agents use: the Streamable HTTP MCP server, Markdown content negotiation, llms.txt, and discovery files. No API key or OAuth is required.`,
      version: "1.0.1",
      contact: {
        name: config.authorName,
        email: config.social.email,
        url: SITE_URL,
      },
      license: { name: "Personal portfolio", url: `${SITE_URL}/privacy` },
    },
    servers: [{ url: SITE_URL, description: `${config.brandName} production` }],
    tags: [
      { name: "mcp", description: "Model Context Protocol Streamable HTTP endpoint" },
      { name: "content", description: "HTML and Markdown page representations" },
      { name: "discovery", description: "Agent discovery files" },
    ],
    paths: {
      "/mcp": {
        post: {
          tags: ["mcp"],
          operationId: "mcpJsonRpc",
          summary: `${config.brandName} MCP JSON-RPC`,
          description:
            "Streamable HTTP MCP endpoint. Send a single JSON-RPC 2.0 message. initialize, tools/list, tools/call, and ping are supported. No auth.",
          parameters: [
            {
              name: "MCP-Protocol-Version",
              in: "header",
              required: false,
              schema: { type: "string", example: "2025-11-25" },
            },
            {
              name: "Accept",
              in: "header",
              required: false,
              schema: { type: "string", example: "application/json, text/event-stream" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/JsonRpcRequest" },
                example: {
                  jsonrpc: "2.0",
                  id: 1,
                  method: "initialize",
                  params: {
                    protocolVersion: "2025-11-25",
                    capabilities: {},
                    clientInfo: { name: "example", version: "1.0.0" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "JSON-RPC result as JSON or a single SSE event",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/JsonRpcResponse" } },
                "text/event-stream": { schema: { type: "string" } },
              },
            },
            "202": { description: "JSON-RPC notification accepted (empty body)" },
            "400": {
              description: "Parse error or invalid request",
              content: { "application/json": { schema: jsonRpcError } },
            },
          },
        },
        get: {
          tags: ["mcp"],
          operationId: "mcpGetNotAllowed",
          summary: "MCP endpoint does not serve a GET stream",
          responses: {
            "405": {
              description: "Method not allowed; use POST",
              content: { "application/json": { schema: jsonRpcError } },
            },
          },
        },
      },
      "/.well-known/mcp": {
        get: {
          tags: ["discovery"],
          operationId: "mcpWellKnownCard",
          summary: `${config.brandName} MCP server card`,
          responses: {
            "200": {
              description: "MCP server card",
              content: {
                "application/json": { schema: { type: "object" } },
                "application/mcp-server-card+json": { schema: { type: "object" } },
              },
            },
          },
        },
        post: {
          tags: ["mcp"],
          operationId: "mcpWellKnownJsonRpc",
          summary: "Same Streamable HTTP MCP protocol as POST /mcp",
          responses: { "200": { description: "JSON-RPC result" } },
        },
      },
      "/.well-known/mcp.json": {
        get: {
          tags: ["discovery"],
          operationId: "mcpRegistryManifest",
          summary: `${config.brandName} MCP registry manifest`,
          responses: {
            "200": {
              description: "MCP server.json manifest",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
      "/.well-known/mcp/server-card.json": {
        get: {
          tags: ["discovery"],
          operationId: "mcpServerCard",
          summary: `${config.brandName} MCP server-card.json`,
          responses: {
            "200": {
              description: "MCP server card",
              content: {
                "application/mcp-server-card+json": { schema: { type: "object" } },
                "application/json": { schema: { type: "object" } },
              },
            },
          },
        },
      },
      "/openapi.json": {
        get: {
          tags: ["discovery"],
          operationId: "getOpenApiSpec",
          summary: `${config.brandName} OpenAPI specification`,
          responses: {
            "200": {
              description: "This document",
              content: { "application/json": { schema: { type: "object" } } },
            },
          },
        },
      },
      "/llms.txt": {
        get: {
          tags: ["discovery"],
          operationId: "getLlmsTxt",
          summary: `${config.brandName} llms.txt index`,
          responses: {
            "200": {
              description: "Plain-text index for language models",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/auth.md": {
        get: {
          tags: ["discovery"],
          operationId: "getAuthDocs",
          summary: `${config.brandName} authentication docs`,
          description: "This site is public. Auth docs explain that no credentials are required.",
          responses: {
            "200": {
              description: "Markdown authentication notes",
              content: { "text/markdown": { schema: { type: "string" } } },
            },
          },
        },
      },
      "/developers": {
        get: {
          tags: ["discovery"],
          operationId: "getDeveloperPortal",
          summary: `${config.brandName} developer portal`,
          responses: {
            "200": {
              description: "HTML developer portal (Markdown via Accept: text/markdown)",
              content: {
                "text/html": { schema: { type: "string" } },
                "text/markdown": { schema: { type: "string" } },
              },
            },
          },
        },
      },
      "/": {
        get: {
          tags: ["content"],
          operationId: "getHomepage",
          summary: `${config.brandName} homepage`,
          parameters: [
            {
              name: "Accept",
              in: "header",
              schema: { type: "string", example: "text/markdown" },
              description: "text/markdown returns a Markdown representation of the page.",
            },
          ],
          responses: {
            "200": {
              description: "Homepage",
              content: {
                "text/html": { schema: { type: "string" } },
                "text/markdown": { schema: { type: "string" } },
              },
            },
            "406": {
              description: "Accept header rejected both HTML and Markdown",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Error: errorSchema,
        JsonRpcRequest: {
          type: "object",
          required: ["jsonrpc", "method"],
          properties: {
            jsonrpc: { type: "string", const: "2.0" },
            id: { type: ["string", "number", "null"] },
            method: {
              type: "string",
              enum: ["initialize", "ping", "tools/list", "tools/call", "notifications/initialized"],
            },
            params: { type: "object" },
          },
        },
        JsonRpcResponse: {
          type: "object",
          required: ["jsonrpc"],
          properties: {
            jsonrpc: { type: "string", const: "2.0" },
            id: { type: ["string", "number", "null"] },
            result: { type: "object" },
            error: jsonRpcError.properties.error,
          },
        },
        McpTool: {
          type: "object",
          properties: {
            name: { type: "string", enum: TOOLS.map((t) => t.name) },
            description: { type: "string" },
          },
        },
      },
    },
    externalDocs: {
      description: `${config.brandName} developer portal`,
      url: `${SITE_URL}/developers`,
    },
  };
}

export { MCP_ENDPOINT };
