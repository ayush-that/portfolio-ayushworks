import { posts } from "#site/content";
import { slug } from "github-slugger";
import { ReactNode } from "react";
import Footer from "~/components/layout/footer";
import Navbar from "~/components/layout/nav";
import PrefetchAll from "~/components/prefetch-all";
import SkipContent from "~/components/ui/skip-content";
import { getAllTags } from "~/lib/utils";

// Every internal route, prefetched on load so the whole site navigates instantly.
const published = posts.filter((post) => post.published);
const prefetchRoutes = [
  "/",
  "/projects",
  "/blog",
  "/tags",
  ...published.map((post) => `/blog/${post.slugAsParams}`),
  ...Object.keys(getAllTags(published)).map((tag) => `/tags/${slug(tag)}`),
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container relative flex min-h-dvh flex-col space-y-4 py-2">
      <PrefetchAll routes={prefetchRoutes} />
      <div className="!mb-6 space-y-4">
        <SkipContent />
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
