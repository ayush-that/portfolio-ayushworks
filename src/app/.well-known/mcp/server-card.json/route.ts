import { mcpOptionsResponse, serverCardResponse } from "~/lib/mcp-http";

export async function GET(req: Request) {
  return serverCardResponse(req);
}

export async function OPTIONS() {
  return mcpOptionsResponse();
}
