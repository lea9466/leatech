import { useId } from 'react';
import { useInView } from '../../../hooks/useInView';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import styles from './AboutVisual.module.css';

/**
 * "צורה שנוצרת" — רשת של עיגולים סביב נקודת חיבור מרכזית אחת, שנבנית
 * פעם אחת כשגוללים אליה: קודם העיגולים, אחר כך הקווים שמחברים ביניהם.
 * מטאפורה ישירה לנקודת האמון הראשונה במסמך האפיון: "הכל תחת קורת גג
 * אחת" — כל שירות מתחבר דרך נקודה אחת, לא רשת אקראית.
 */
const HUB = { cx: 200, cy: 200, r: 15 };

const NODES = [
  { cx: 335, cy: 195, r: 9, tone: 'a' },
  { cx: 285, cy: 95, r: 7, tone: 'b' },
  { cx: 195, cy: 65, r: 8, tone: 'a' },
  { cx: 100, cy: 115, r: 6, tone: 'b' },
  { cx: 65, cy: 205, r: 9, tone: 'a' },
  { cx: 115, cy: 300, r: 7, tone: 'b' },
  { cx: 205, cy: 335, r: 8, tone: 'a' },
  { cx: 300, cy: 285, r: 6, tone: 'b' },
];

const NODE_DELAYS = [120, 200, 280, 360, 440, 520, 600, 680];
const SPOKE_DELAYS = [900, 970, 1040, 1110, 1180, 1250, 1320, 1390];
const RIM_DELAYS = [1550, 1620, 1690, 1760, 1830, 1900, 1970, 2040];

export function AboutVisual() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const built = inView || prefersReducedMotion;
  const gradientId = useId();

  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.svg} viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        {/* הטבעת (קווים + עיגולים חיצוניים) ממשיכה לסחור לאט סביב המרכז
            אחרי שהבנייה הסתיימה — תנועה עדינה ומתמשכת, לא עוד "בנייה". */}
        <g className={built ? styles.ringSpin : undefined}>
          {NODES.map((n, i) => {
            const next = NODES[(i + 1) % NODES.length];
            return (
              <line
                key={`rim-${i}`}
                x1={n.cx}
                y1={n.cy}
                x2={next.cx}
                y2={next.cy}
                pathLength={1}
                className={built ? styles.edgeBuilt : styles.edge}
                style={prefersReducedMotion ? undefined : { animationDelay: `${RIM_DELAYS[i]}ms` }}
              />
            );
          })}
          {NODES.map((n, i) => (
            <line
              key={`spoke-${i}`}
              x1={HUB.cx}
              y1={HUB.cy}
              x2={n.cx}
              y2={n.cy}
              pathLength={1}
              className={built ? styles.edgeBuilt : styles.edge}
              style={prefersReducedMotion ? undefined : { animationDelay: `${SPOKE_DELAYS[i]}ms` }}
            />
          ))}
          {NODES.map((n, i) => (
            <circle
              key={`node-${i}`}
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              className={
                built
                  ? n.tone === 'a'
                    ? styles.nodeBuiltA
                    : styles.nodeBuiltB
                  : n.tone === 'a'
                    ? styles.nodeA
                    : styles.nodeB
              }
              style={prefersReducedMotion ? undefined : { animationDelay: `${NODE_DELAYS[i]}ms` }}
            />
          ))}
        </g>

        <circle
          cx={HUB.cx}
          cy={HUB.cy}
          r={HUB.r}
          fill={`url(#${gradientId})`}
          className={built ? styles.hubBuilt : styles.hub}
        />
      </svg>
    </div>
  );
}
