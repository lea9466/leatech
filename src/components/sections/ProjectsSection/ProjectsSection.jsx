import content from '../../../data/site-content.json';
import { SECTION_IDS } from '../../../constants/navigation';
import { SectionHeader } from '../../ui/SectionHeader';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectsSection.module.css';

const HEADING_ID = 'projects-title';

export function ProjectsSection() {
  return (
    <section id={SECTION_IDS.caseStudy} className={styles.section} aria-labelledby={HEADING_ID}>
      <div className={styles.container}>
        <SectionHeader
          id={HEADING_ID}
          eyebrow="פרויקטים"
          title="פרויקטים נבחרים"
          description="שלושה פרויקטים אמיתיים — לא הדמיות."
          gradient
        />

        <div className={styles.list}>
          {content.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
