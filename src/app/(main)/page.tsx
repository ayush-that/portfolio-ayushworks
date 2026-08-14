import { posts } from "#site/content";
import AboutSection from "~/components/about-section";
import { PostList } from "~/components/post";
import { ProjectList, projects } from "~/components/project";
import { sortPosts } from "~/lib/utils";
import ContactUs from "../../components/contact-us";
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
      <ContactUs />
    </main>
  );
};

export default HomePage;
