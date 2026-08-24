import { markdownForPath, notFoundMarkdown } from "~/lib/markdown";

// Serves the text/markdown representation of any site page. The proxy rewrites
// `Accept: text/markdown` requests for /x here as /md/x; direct hits work too.
export async function GET(_req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const pathname = `/${path.join("/")}`;
  const body = markdownForPath(pathname);

  return new Response(body ?? notFoundMarkdown(pathname), {
    status: body ? 200 : 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
