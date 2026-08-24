import { handleMcpMessage } from "~/lib/mcp";

// MCP Streamable HTTP endpoint (stateless, JSON responses). Manifest at
// /.well-known/mcp.json points here.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, MCP-Protocol-Version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

export async function POST(req: Request) {
  let message: unknown;
  try {
    message = await req.json();
  } catch {
    return json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, 400);
  }

  // Batches were removed in protocol 2025-06-18; accept single messages only.
  if (Array.isArray(message) || typeof message !== "object" || message === null) {
    return json(
      { jsonrpc: "2.0", id: null, error: { code: -32600, message: "Invalid Request" } },
      400,
    );
  }

  const response = handleMcpMessage(message);
  // Notifications get 202 Accepted with no body per the transport spec.
  if (response === null) return new Response(null, { status: 202, headers: CORS });
  return json(response);
}

// This server has no server-initiated streams; the spec allows 405 here.
export async function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST", ...CORS } });
}

export async function DELETE() {
  // Stateless server: no session to terminate.
  return new Response(null, { status: 405, headers: { Allow: "POST", ...CORS } });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
