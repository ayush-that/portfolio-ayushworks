import { typo } from "../ui/typograpghy";
import { TWorkExperience } from "./_work-experience-data";
import WorkExperienceItem from "./work-experience-item";

type WorkExperienceListProps = {
  experiences: TWorkExperience[];
  showTitle?: boolean;
};

const WorkExperienceList = ({
  experiences,
  showTitle = true,
}: WorkExperienceListProps) => {
  return (
    <section aria-label="work experience" className="mt-5 space-y-6">
      {showTitle && (
        <h2 className={typo({ variant: "h2" })}>Work Experience</h2>
      )}

      <div className="!mt-8">
        <ol className="space-y-6" role="list">
          {experiences.map((experience, index) => (
            <WorkExperienceItem
              key={experience.id}
              {...experience}
              isLast={index === experiences.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WorkExperienceList;
