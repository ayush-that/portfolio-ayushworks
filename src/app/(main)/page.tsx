import { posts } from "#site/content";
import AboutSection from "~/components/about-section";
import { PostList } from "~/components/post";
import { ProjectList, projects } from "~/components/project";
import { sortPosts } from "~/lib/utils";
import ContactUsLazy from "~/components/contact-us-lazy";
import GitHubContributions from "~/components/github-contributions";

const HomePage = () => {
  const publishedPosts = posts.filter((post) => post.published);
  const sortedPosts = sortPosts(publishedPosts);

  return (
    <main id="main-content" className="mt-8! space-y-14">
      <AboutSection />
      <GitHubContributions />
      <ProjectList projects={projects.slice(0, 4)} metadata eager={false} />
      <PostList posts={sortedPosts.slice(0, 4)} showRss layout="single" eager={false} />
      <ContactUsLazy />
    </main>
  );
};

export default HomePage;
