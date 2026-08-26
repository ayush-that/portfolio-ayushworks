import { NextRequest, NextResponse } from "next/server";
import { preferredType } from "~/lib/accept";

// Markdown content negotiation (https://acceptmarkdown.com): agents that ask
// for `Accept: text/markdown` get a Markdown representation of the same URL,
// rewritten to the /md route handler. Browsers keep getting HTML.
// `Vary: Accept` is added globally in next.config.ts headers().
// middleware.ts (not proxy.ts): OpenNext Cloudflare only supports edge
// middleware, and Next 16 pins proxy.ts to the Node runtime.
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Only negotiate document fetches. Next's RSC/prefetch requests, non-GET
  // traffic, and the /md handler itself (the worker re-runs middleware on
  // rewritten requests) must pass through untouched.
  if (
    (req.method !== "GET" && req.method !== "HEAD") ||
    req.headers.get("rsc") ||
    pathname === "/md" ||
    pathname.startsWith("/md/")
  ) {
    return NextResponse.next();
  }

  const acceptHeader = req.headers.get("accept");
  const chosen = preferredType(acceptHeader);

  if (chosen === "text/markdown") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/md" : `/md${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (chosen === null && acceptHeader) {
    return new NextResponse("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Pages only: skip API routes, the MCP endpoint, Next internals, the Tina
  // admin, the /md handler itself, and anything with a file extension.
  matcher: ["/((?!api/|mcp|md/|md$|_next/|admin|\\.well-known/|.*\\..*).*)"],
};
