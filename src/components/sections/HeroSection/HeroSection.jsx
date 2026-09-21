import content from '../../../data/site-content.json';
import { SECTION_IDS } from '../../../constants/navigation';
import { Button } from '../../ui/Button';
import { HeroVisual } from './HeroVisual';
import styles from './HeroSection.module.css';

const HEADING_ID = 'hero-title';

export function HeroSection() {
  const { eyebrow, headline, headlineAccent, subheadline, cta } = content.hero;

  return (
    <section id={SECTION_IDS.hero} className={styles.hero} aria-labelledby={HEADING_ID}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            {eyebrow}
          </span>

          <h1 id={HEADING_ID} className={styles.title}>
            <span className={styles.titleLine}>{headline}</span>{' '}
            <span className={styles.titleAccent}>{headlineAccent}</span>
          </h1>

          <p className={styles.subheadline}>{subheadline}</p>

          <div className={styles.actions}>
            <Button href={`#${SECTION_IDS[cta.primary.target]}`}>{cta.primary.label}</Button>
            <Button href={`#${SECTION_IDS[cta.secondary.target]}`} variant="ghost" className={styles.ghostButton}>
              {cta.secondary.label}
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
