import content from '../../../data/site-content.json';
import { SECTION_IDS } from '../../../constants/navigation';
import { GlassCard } from '../../ui/GlassCard';
import { SectionHeader } from '../../ui/SectionHeader';
import { cn } from '../../../utils/cn';
import { useInView } from '../../../hooks/useInView';
import { ScrollRobot } from '../../decorative/ScrollRobot';
import { SERVICE_ICONS, BEFORE_ICON_SETS, ArrowIcon } from './ServiceIcons';
import styles from './ServicesSection.module.css';

const HEADING_ID = 'services-title';

/** לכל שירות תנועת הובר משלו על האייקון – ראו ה-keyframes ב-CSS */
const ICON_MOTION_CLASS = Object.freeze({
  web: 'iconWebsite',
  automation: 'iconAutomation',
  integrations: 'iconIntegration',
  ai: 'iconAi',
});

export function ServicesSection() {
  const [gridRef, gridInView] = useInView({ threshold: 0.2 });

  return (
    <section id={SECTION_IDS.services} className={styles.section} aria-labelledby={HEADING_ID}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <SectionHeader
            id={HEADING_ID}
            eyebrow="שירותים"
            title="במה אפשר לעזור"
            description="מאתר ראשון ועד מערכת שמריצה את העסק – כל פרויקט נבנה סביב איך שאתם באמת עובדים."
            gradient
          />

          <ScrollRobot />
        </div>

        <ul ref={gridRef} className={cn(styles.grid, gridInView && styles.revealed)}>
          {content.services.map(({ id, title, text }) => {
            const Icon = SERVICE_ICONS[id];
            const beforeIcons = BEFORE_ICON_SETS[id];
            return (
              <GlassCard as="li" key={id} className={styles.card} interactive>
                <div className={styles.transform}>
                  <div className={styles.beforeCluster} aria-hidden="true">
                    {beforeIcons.map((BeforeIcon, i) => (
                      <span key={i} className={cn(styles.beforeIcon, styles[`beforeIcon${i}`])}>
                        <BeforeIcon className={styles.beforeIconGlyph} />
                      </span>
                    ))}
                  </div>
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowIcon className={styles.arrowGlyph} />
                  </span>
                  <span className={styles.afterIcon}>
                    <Icon className={cn(styles.icon, styles[ICON_MOTION_CLASS[id]])} />
                  </span>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{text}</p>
              </GlassCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
