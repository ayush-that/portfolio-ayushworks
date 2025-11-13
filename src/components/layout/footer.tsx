import config from "~/config";
import { CustomLink } from "../mdx";

const Footer = () => {
  return (
    <footer className="!mt-auto flex flex-col items-center justify-center py-4">
      <div className="flex w-full flex-wrap items-center justify-center gap-2 text-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Developed with 🩵 by Shydev</span>

        <ul role="list" className="flex items-center gap-2">
          <li role="listitem">
            <CustomLink aria-label="visit rss feed" href={`https://${config.domainName}/feed.xml`}>
              RSS FEED
            </CustomLink>
          </li>
          <span> / </span>
          <li role="listitem">
            <CustomLink href={`https://${config.domainName}/sitemap.xml`}>SITE MAP</CustomLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
