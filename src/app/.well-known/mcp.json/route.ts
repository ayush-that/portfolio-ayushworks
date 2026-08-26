import {
  handleMcpHttp,
  mcpOptionsResponse,
  registryManifestResponse,
} from "~/lib/mcp-http";

export async function GET() {
  return registryManifestResponse();
}

export async function POST(req: Request) {
  return handleMcpHttp(req);
}

export async function OPTIONS() {
  return mcpOptionsResponse();
}
