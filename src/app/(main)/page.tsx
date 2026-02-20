import { posts } from "#site/content";
import AboutSection from "~/components/about-section";
import { PostList } from "~/components/post";
import { ProjectList, projects } from "~/components/project";
import Skills from "~/components/skills";
import { WorkExperienceList, workExperiences } from "~/components/work-experience";
import { sortPosts } from "~/lib/utils";
import ContactUs from "../../components/contact-us";
import GitHubContributions from "~/components/github-contributions";

const HomePage = () => {
  const publishedPosts = posts.filter((post) => post.published);
  const sortedPosts = sortPosts(publishedPosts);

  return (
    <div className="!mt-8 space-y-14">
      <AboutSection />
      <Skills />
      <WorkExperienceList experiences={workExperiences} />
      <GitHubContributions />
      <ProjectList projects={projects.slice(0, 4)} metadata />
      <PostList posts={sortedPosts.slice(0, 4)} showRss layout="single" />
      <ContactUs />
    </div>
  );
};

export default HomePage;
