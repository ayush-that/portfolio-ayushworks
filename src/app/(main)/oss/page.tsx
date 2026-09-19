import config from "~/config";
import { getSEOTags } from "~/lib/seo";
import OSSPageClient from "./oss-page-client";

export const metadata: ReturnType<typeof getSEOTags> = getSEOTags({
  title: `OSS · ${config.authorName}`,
  description: `Open source contributions by ${config.authorName}: pull requests, bug reports, and proposals across developer tools, observability, and cloud-native projects.`,
  canonicalUrlRelative: "/oss",
  keywords: ["open source", "OSS", "contributions", config.authorName],
});

export default function OSSPage() {
  return <OSSPageClient />;
}
