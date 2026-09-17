import content from '../../../data/site-content.json';
import { SECTION_IDS } from '../../../constants/navigation';
import { SectionHeader } from '../../ui/SectionHeader';
import { AboutVisual } from './AboutVisual';
import { TrustTyping } from './TrustTyping';
import styles from './AboutSection.module.css';

const HEADING_ID = 'about-title';

export function AboutSection() {
  const { eyebrow, heading, body, trustPoints } = content.about;

  return (
    <section id={SECTION_IDS.about} className={styles.section} aria-labelledby={HEADING_ID}>
      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.copy}>
            <SectionHeader id={HEADING_ID} eyebrow={eyebrow} title={heading} description={body} gradient />
          </div>
          <div className={styles.visual}>
            <AboutVisual />
          </div>
        </div>

        <TrustTyping trustPoints={trustPoints} />
      </div>
    </section>
  );
}
