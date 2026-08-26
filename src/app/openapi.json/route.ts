import { openApiSpec } from "~/lib/openapi";

export async function GET() {
  return new Response(JSON.stringify(openApiSpec()), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
