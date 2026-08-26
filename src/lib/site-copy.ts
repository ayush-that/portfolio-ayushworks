import config from "~/config";

// Single source for the trust pages (/about, /contact, /privacy). Both the
// HTML pages and the text/markdown representations render from these strings.
export type TrustPage = { title: string; description: string; paragraphs: string[] };

export const aboutPage: TrustPage = {
  title: "About",
  description: `Who ${config.authorName} (shydev) is: a product-focused full-stack and applied-AI engineer.`,
  paragraphs: [
    `I'm ${config.authorName}, known online as shydev. I'm a product-focused full-stack engineer who ships fast: I turn ambiguous ideas into polished, working software and obsess over the details that make products feel right.`,
    "I work across applied AI (multimodal RAG, agent systems, scraping and content pipelines), full-stack web apps, and mobile. My daily tools are TypeScript, Python, Go, Rust, C++, and Next.js, with Cloudflare Workers, self-hosted VPS boxes, and PostgreSQL underneath. I'm comfortable in every layer of the stack, from infrastructure to interface design.",
    "The track record: 69+ freelance products shipped to production, 15+ hackathon wins, one product sold (Trendscreener.ai), two startup internships, and two failed startups of my own that taught me more than any job could. I also write about engineering, AI, and self-hosting on this site's blog, and I've built an audience of 42K+ followers across social platforms.",
    "I'm currently open to full-time roles, freelance contracts, and collaborations. If you want an engineer who takes a product from zero to launched without hand-holding, get in touch via the contact page.",
  ],
};

export const contactPage: TrustPage = {
  title: "Contact",
  description: `How to reach ${config.authorName} (shydev) for full-time roles, freelance work, or collaborations.`,
  paragraphs: [
    `The fastest way to reach me is email: ${config.social.email}. I read everything and reply to real messages, usually within a day. For calls, book a slot directly at cal.com/shydev.`,
    `I'm on GitHub as ayush-that (${config.social.github}), on Twitter/X as @shydev69 (${config.social.twitter}), on LinkedIn (${config.social.linkedin}), and on YouTube (${config.social.youtube}). For quick questions, a Twitter DM works; for anything involving work, scope, or money, use email so there's a written record.`,
    "What to include if you're hiring or contracting: what you're building, the timeline, the budget or salary band, and what \"done\" looks like. I work async-first and communicate in writing, so a clear first message gets a clear first reply.",
    "I'm based in India (IST, UTC+5:30) and regularly work with teams in US and EU timezones. My resume is at ayushworks.com/resume, and a machine-readable summary of my work lives at ayushworks.com/llms.txt.",
  ],
};

export const privacyPage: TrustPage = {
  title: "Privacy Policy",
  description: "What ayushworks.com collects (very little), how it's used, and who to contact.",
  paragraphs: [
    "This site is a personal portfolio and blog. It exists to show my work and writing, not to collect data. There are no ads, no third-party ad trackers, and no marketing cookies.",
    "What is collected: standard server logs at the edge (Cloudflare), which include IP address, user agent, and requested URL, used only for security and performance and retained per Cloudflare's defaults. Blog posts keep an anonymous aggregate view counter; it stores a number per post, not who you are.",
    "Comments are powered by Giscus, which is backed by GitHub Discussions. If you comment, you do so with your GitHub account under GitHub's own privacy policy; this site never sees your GitHub credentials. Embedded content (YouTube videos, tweets) is loaded from the respective platforms and is subject to their policies.",
    `If you email me or book a call, I keep that correspondence to reply to you and for my own records; I don't sell or share it. To ask about or request deletion of anything you've sent me, email ${config.social.email}.`,
    "This policy was last updated on 24 August 2026. If the site's behavior changes in a way that affects your privacy, this page changes with it.",
  ],
};

export const trustPages: Record<string, TrustPage> = {
  about: aboutPage,
  contact: contactPage,
  privacy: privacyPage,
};

export const developersPage: TrustPage = {
  title: `${config.brandName} developer resources`,
  description: `${config.brandName} MCP server, OpenAPI spec, auth docs, and Markdown API for ${config.authorName}'s portfolio at ${config.domainName}.`,
  paragraphs: [
    `${config.brandName} (${config.domainName}) is the public portfolio of ${config.authorName} (shydev), a software engineer. This page is the developer portal: MCP server, OpenAPI spec, authentication notes, and content negotiation. Nothing here requires an API key.`,
    `MCP server (Streamable HTTP): POST JSON-RPC 2.0 to https://${config.domainName}/mcp. Protocol versions 2025-06-18, 2025-11-25, and 2026-07-28 are accepted. Tools: get_profile, list_projects, list_posts, get_post. Discovery: /.well-known/mcp.json, /.well-known/mcp, and /.well-known/mcp/server-card.json.`,
    `OpenAPI specification: https://${config.domainName}/openapi.json. It describes the MCP endpoint, Markdown negotiation, llms.txt, and this portal so agents can map the surface without crawling HTML.`,
    `Authentication: none. Every public URL on ${config.domainName} is readable without OAuth, cookies, or an API key. Do not send secrets. Details: https://${config.domainName}/auth.md.`,
    `Markdown: send Accept: text/markdown to any page (for example curl -H "Accept: text/markdown" https://${config.domainName}/). HTML remains the default for browsers. Index: https://${config.domainName}/llms.txt. Sitemap: https://${config.domainName}/sitemap.xml. RSS: https://${config.domainName}/feed.xml.`,
    `Contact for integrations or hiring: ${config.social.email}. Person: ${config.authorName}. Brand: ${config.brandName}. Location: ${config.location.country}.`,
  ],
};
