import {
  handleMcpHttp,
  mcpDeleteResponse,
  mcpOptionsResponse,
  serverCardResponse,
} from "~/lib/mcp-http";

// GET: MCP server card (discovery). POST: Streamable HTTP MCP endpoint,
// so clients that treat /.well-known/mcp as the protocol URL still handshake.

export async function GET(req: Request) {
  const accept = (req.headers.get("accept") ?? "").toLowerCase();
  const wantsStream = accept.includes("text/event-stream");
  const wantsCard =
    accept.includes("application/json") ||
    accept.includes("application/mcp-server-card+json") ||
    accept === "" ||
    accept.includes("*/*");

  if (wantsStream && !wantsCard) {
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        id: null,
        error: { code: -32000, message: "Method not allowed." },
      }),
      {
        status: 405,
        headers: { "Content-Type": "application/json; charset=utf-8", Allow: "POST" },
      },
    );
  }

  return serverCardResponse(req);
}

export async function POST(req: Request) {
  return handleMcpHttp(req);
}

export async function DELETE() {
  return mcpDeleteResponse();
}

export async function OPTIONS() {
  return mcpOptionsResponse();
}
