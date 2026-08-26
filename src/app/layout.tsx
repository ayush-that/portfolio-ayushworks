import Script from "next/script";
import { fontSans } from "~/components/ui/fonts";
import { getSEOTags, renderSchemaTags } from "~/lib/seo";
import { cn } from "~/lib/utils";
import RootProviders from "~/providers";
import "../styles/globals.css";

export const viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontSans.variable}
      // Lets Next turn off smooth scrolling for route changes while keeping it for #anchors.
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="alternate" type="text/plain" title="LLM-friendly summary" href="/llms.txt" />
        <link
          rel="alternate"
          type="application/json"
          title="OpenAPI specification"
          href="/openapi.json"
        />
        <link
          rel="alternate"
          type="application/mcp-server-card+json"
          title="MCP server card"
          href="/.well-known/mcp/server-card.json"
        />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.className)}>
        {renderSchemaTags()}

        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
