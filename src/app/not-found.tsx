import Link from "next/link";

export default function Custom404() {
  return (
    <section className="flex min-h-dvh items-center py-6" id="main-content">
      <main className="container relative flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="rounded-xl bg-white p-6">
          <div
            aria-hidden="true"
            className="h-56 w-56 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/404-illustration.svg')" }}
          />
        </div>
        <p className="font-serif text-3xl font-semibold tracking-tight md:text-4xl">
          This page doesn’t exist
        </p>

        <p className="mx-auto -mt-2 max-w-3xl text-center text-xs sm:text-base">
          Oops! It seems like you’ve stumbled upon a page that doesn’t exist Don’t worry, even the
          best of us get lost sometimes. Feel free to navigate back to Home or contact us if you
          need help
        </p>

        <nav aria-label="Where to go instead" className="text-center text-xs sm:text-sm">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <li>
              <Link className="text-ring underline" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-ring underline" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="text-ring underline" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="text-ring underline" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <a className="text-ring underline" href="/sitemap.xml">
                Sitemap
              </a>
            </li>
            <li>
              <a className="text-ring underline" href="/llms.txt">
                llms.txt
              </a>
            </li>
          </ul>
        </nav>
      </main>
    </section>
  );
}
