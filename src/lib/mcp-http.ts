import {
  handleMcpMessage,
  mcpRegistryManifest,
  mcpServerCard,
  negotiateProtocolVersion,
  PROTOCOL_VERSIONS,
} from "~/lib/mcp";

export const MCP_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers": "Mcp-Session-Id, MCP-Protocol-Version",
};

type ProtocolVersion = (typeof PROTOCOL_VERSIONS)[number];

function protocolFromRequest(req: Request, bodyVersion?: unknown): ProtocolVersion {
  const header = req.headers.get("mcp-protocol-version") ?? req.headers.get("MCP-Protocol-Version");
  if (header) return negotiateProtocolVersion(header);
  return negotiateProtocolVersion(bodyVersion);
}

function wantsSse(req: Request): boolean {
  const accept = (req.headers.get("accept") ?? "").toLowerCase();
  return accept.includes("text/event-stream");
}

function protocolHeaders(version: ProtocolVersion, extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  headers.set("MCP-Protocol-Version", version);
  for (const [key, value] of Object.entries(MCP_CORS)) headers.set(key, value);
  return headers;
}

function jsonResponse(body: unknown, req: Request, status = 200, bodyVersion?: unknown) {
  const version = protocolFromRequest(req, bodyVersion);
  const extra: Record<string, string> = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };
  if (status === 405) extra.Allow = "POST, OPTIONS";
  if (wantsSse(req) && status === 200) {
    return new Response(`event: message\ndata: ${JSON.stringify(body)}\n\n`, {
      status: 200,
      headers: protocolHeaders(version, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      }),
    });
  }
  return new Response(JSON.stringify(body), {
    status,
    headers: protocolHeaders(version, extra),
  });
}

export function mcpOptionsResponse() {
  return new Response(null, { status: 204, headers: MCP_CORS });
}

export function mcpGetNotAllowed(req: Request) {
  return jsonResponse(
    { jsonrpc: "2.0", id: null, error: { code: -32000, message: "Method not allowed." } },
    req,
    405,
  );
}

export function mcpDeleteResponse() {
  return new Response(null, {
    status: 405,
    headers: { Allow: "POST", ...MCP_CORS },
  });
}

function unsupportedProtocolHeader(req: Request): Response | null {
  const header = req.headers.get("mcp-protocol-version") ?? req.headers.get("MCP-Protocol-Version");
  if (!header) return null;
  if (PROTOCOL_VERSIONS.includes(header as ProtocolVersion)) return null;
  return jsonResponse(
    {
      jsonrpc: "2.0",
      id: null,
      error: { code: -32600, message: `Unsupported MCP-Protocol-Version: ${header}` },
    },
    req,
    400,
  );
}

export async function handleMcpHttp(req: Request): Promise<Response> {
  const rejected = unsupportedProtocolHeader(req);
  if (rejected) return rejected;

  let message: unknown;
  try {
    message = await req.json();
  } catch {
    return jsonResponse(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      req,
      400,
    );
  }

  // Batches were removed in protocol 2025-06-18; accept single messages only.
  if (Array.isArray(message) || typeof message !== "object" || message === null) {
    return jsonResponse(
      { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid Request" } },
      req,
      400,
    );
  }

  const response = handleMcpMessage(message as { jsonrpc?: string; method?: string });
  if (response === null) {
    return new Response(null, { status: 202, headers: MCP_CORS });
  }

  const requestedVersion = (message as { params?: { protocolVersion?: unknown } }).params
    ?.protocolVersion;
  return jsonResponse(response, req, 200, requestedVersion);
}

function cardContentType(req: Request): string {
  const accept = (req.headers.get("accept") ?? "").toLowerCase();
  if (accept.includes("application/mcp-server-card+json")) {
    return "application/mcp-server-card+json; charset=utf-8";
  }
  return "application/json; charset=utf-8";
}

export function serverCardResponse(req: Request) {
  return new Response(JSON.stringify(mcpServerCard()), {
    status: 200,
    headers: {
      "Content-Type": cardContentType(req),
      "Cache-Control": "public, max-age=300",
      ...MCP_CORS,
    },
  });
}

export function registryManifestResponse() {
  return new Response(JSON.stringify(mcpRegistryManifest()), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      ...MCP_CORS,
    },
  });
}
