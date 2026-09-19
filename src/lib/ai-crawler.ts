// Known unsolicited AI / training crawlers. Search engines (Googlebot, Bingbot)
// and social unfurlers (Twitterbot, facebookexternalhit, LinkedInBot) are not
// listed here and must stay allowed.
const AI_CRAWLER_SNIPPETS = [
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "claudebot",
  "claude-user",
  "claude-searchbot",
  "anthropic-ai",
  "google-extended",
  "bytespider",
  "ccbot",
  "perplexitybot",
  "perplexity-user",
  "amazonbot",
  "applebot-extended",
  "meta-externalagent",
  "meta-externalfetcher",
  "diffbot",
  "youbot",
  "cohere-ai",
  "ai2bot",
  "imagesiftbot",
  "timpibot",
  "webzio-extended",
  "mistralai-user",
  "duckassistbot",
  "iaskspider",
  "deepseekbot",
  "petalbot",
] as const;

export function isUnsolicitedAiCrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return AI_CRAWLER_SNIPPETS.some((snippet) => ua.includes(snippet));
}
