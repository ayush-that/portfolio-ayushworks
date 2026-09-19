import { NextRequest, NextResponse } from "next/server";
import { isUnsolicitedAiCrawler } from "~/lib/ai-crawler";

// middleware.ts (not proxy.ts): OpenNext Cloudflare only supports edge
// middleware, and Next 16 pins proxy.ts to the Node runtime.
export function middleware(req: NextRequest) {
  if (isUnsolicitedAiCrawler(req.headers.get("user-agent"))) {
    return new NextResponse("Forbidden\n", {
      status: 403,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=300",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|admin|api/|.*\\..*).*)"],
};
