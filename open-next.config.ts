import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Next 16 stores experimental.prefetchInlining as an object. OpenNext's
  // interceptor treats that as truthy and never returns a segment prefetch, so
  // the App Router retries forever.
  // https://github.com/opennextjs/opennextjs-aws/issues/1212
  enableCacheInterception: false,
});
