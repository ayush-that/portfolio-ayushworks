import {
  handleMcpHttp,
  mcpDeleteResponse,
  mcpGetNotAllowed,
  mcpOptionsResponse,
} from "~/lib/mcp-http";

export async function POST(req: Request) {
  return handleMcpHttp(req);
}

export async function GET(req: Request) {
  return mcpGetNotAllowed(req);
}

export async function DELETE() {
  return mcpDeleteResponse();
}

export async function OPTIONS() {
  return mcpOptionsResponse();
}
