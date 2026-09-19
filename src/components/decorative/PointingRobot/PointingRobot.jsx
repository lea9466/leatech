import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../utils/cn';
import styles from './PointingRobot.module.css';

/**
 * רובוט צף ולבן בצורת ביצה (עיצוב 3 מדף הדוגמאות), שמצביע עם פנס
 * לכיוון טופס יצירת הקשר (שמאלה). תנועה חד-פעמית כשמגיעים אליו —
 * מרים יד, הפנס נדלק וקרן האור נפתחת — ואז נשאר במקום, בלי נפנוף
 * מתמשך. ה-viewBox חתוך לגוף בלבד כדי שיישב צמוד לקצה.
 */
export function PointingRobot() {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <div ref={ref} className={cn(styles.root, inView && styles.play)} aria-hidden="true">
      <svg viewBox="50 70 155 155" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pointing-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6f9fc" />
            <stop offset="1" stopColor="#a9b5c3" />
          </linearGradient>
          <linearGradient id="pointing-beam" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="-100" y2="0">
            <stop offset="0" className={styles.beamStart} />
            <stop offset="1" className={styles.beamEnd} />
          </linearGradient>
        </defs>

        <ellipse cx="150" cy="212" rx="30" ry="5" className={styles.shadow} />
        <ellipse cx="150" cy="200" rx="14" ry="4" className={styles.thruster} />

        <path d="M184 124 L194 152" className={styles.limbEdge} strokeWidth="15" />
        <path d="M184 124 L194 152" className={styles.limb} strokeWidth="12" />

        <ellipse cx="150" cy="138" rx="35" ry="55" className={styles.body} />
        <path d="M117 132 Q150 144 183 132" className={styles.seam} />
        <circle cx="150" cy="152" r="4" className={styles.chestLight} />
        <circle cx="150" cy="152" r="7" className={styles.chestRing} />

        <ellipse cx="150" cy="102" rx="28" ry="20" className={styles.face} />
        <ellipse cx="140" cy="102" rx="5" ry="7.5" className={styles.eyeGlow} />
        <ellipse cx="160" cy="102" rx="5" ry="7.5" className={styles.eyeGlow} />
        <ellipse cx="140" cy="102" rx="4.5" ry="7" className={styles.eye} />
        <ellipse cx="160" cy="102" rx="4.5" ry="7" className={styles.eye} />

        <circle cx="118" cy="122" r="6" className={styles.socket} />

        <g className={styles.armFront}>
          <g transform="translate(64 92) rotate(-8)">
            <polygon points="-6,-5 -6,5 -100,32 -100,-32" fill="url(#pointing-beam)" className={styles.beam} />
          </g>
          <path d="M112 120 L84 102" className={styles.limbEdge} strokeWidth="15" />
          <path d="M112 120 L84 102" className={styles.limb} strokeWidth="12" />
          <ellipse cx="78" cy="98" rx="9" ry="8" className={styles.hand} />
          <g transform="translate(64 92) rotate(-18)">
            <circle r="16" className={styles.lanternHalo} />
            <path d="M-5 -12 L-5 -17 Q0 -21 5 -17 L5 -12" className={styles.lanternHandle} />
            <rect x="-9" y="-12" width="18" height="24" rx="5" className={styles.lanternBody} />
            <circle r="5.5" className={styles.lanternBulb} />
            <circle r="5.5" className={styles.lanternBulbLit} />
            <circle r="2.2" className={styles.lanternCore} />
          </g>
        </g>
      </svg>
    </div>
  );
}
