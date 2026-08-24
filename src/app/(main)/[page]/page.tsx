import { notFound } from "next/navigation";
import config from "~/config";
import { getSEOTags } from "~/lib/seo";
import { trustPages } from "~/lib/site-copy";
import { typo } from "~/components/ui/typograpghy";

// Trust pages: /about, /contact, /privacy.
type Props = { params: Promise<{ page: string }> };

export const generateStaticParams = () => Object.keys(trustPages).map((page) => ({ page }));
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const page = trustPages[(await params).page];
  if (!page) return {};
  return getSEOTags({
    title: `${page.title} · ${config.authorName}`,
    description: page.description,
    canonicalUrlRelative: `/${(await params).page}`,
  });
}

const TrustPage = async ({ params }: Props) => {
  const page = trustPages[(await params).page];
  if (!page) notFound();

  return (
    <main id="main-content" className="mt-8! max-w-3xl space-y-4">
      <h1 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">{page.title}</h1>
      {page.paragraphs.map((paragraph, i) => (
        <p key={i} className={typo({ variant: "paragraph", font: "sans" })}>
          {paragraph}
        </p>
      ))}
    </main>
  );
};

export default TrustPage;
