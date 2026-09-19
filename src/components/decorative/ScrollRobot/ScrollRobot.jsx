import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';
import styles from './ScrollRobot.module.css';

/**
 * רובוט קטן שנכנס מצד שמאל של המסך ממש כשמגיעים לאזור שלו: לא מספיק
 * שהאזור "יעבור" מתחת לרף מסוים תוך כדי גלילה מהירה — צריך שהגלילה
 * גם תיעצר בפועל ליד האזור (debounce על אירועי scroll, עם בדיקת
 * נראות מחדש ברגע שהגלילה נרגעת), אחרת התחלת האנימציה מקדימה את
 * הרגע שבו המשתמשת בפועל מסתכלת עליו. מהליך בנחת, מרים פנס שנדלק —
 * אנימציה חד-פעמית על ציר זמן משלה, לא תלוית גלילה מרגע שהתחילה,
 * ולא חוזרת אחורה.
 */
export function ScrollRobot() {
  const ref = useRef(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (play) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    const isSettledInView = () => {
      const rect = node.getBoundingClientRect();
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      return visible / rect.height >= 0.5;
    };

    let settleTimer;
    const scheduleCheck = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (isSettledInView()) setPlay(true);
      }, 250);
    };

    scheduleCheck();
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
    };
  }, [play]);

  return (
    <div className={styles.section} aria-hidden="true">
      <div ref={ref} className={styles.container}>
        <div className={cn(styles.figure, play && styles.play)}>
          <svg viewBox="0 0 160 170" className={styles.svg} xmlns="http://www.w3.org/2000/svg">
            <g className={styles.legs}>
              <rect x="57" y="118" width="10" height="34" rx="5" className={styles.leg1} />
              <rect x="93" y="118" width="10" height="34" rx="5" className={styles.leg2} />
            </g>

            <rect x="46" y="64" width="52" height="56" rx="16" className={styles.body} />

            <path d="M46 76 Q32 88 36 104" className={styles.armBack} />

            <g className={styles.armFront}>
              <path d="M98 76 Q118 66 112 38" className={styles.armFrontPath} />
              <circle cx="111" cy="30" r="15" className={styles.lanternHalo} />
              <path d="M105 18 L105 12 Q111 8 117 12 L117 18" className={styles.lanternHandle} />
              <rect x="101" y="18" width="20" height="24" rx="5" className={styles.lanternBody} />
              <circle cx="111" cy="30" r="6" className={styles.lanternBulb} />
              <circle cx="111" cy="30" r="6" className={styles.lanternBulbLit} />
            </g>

            <rect x="52" y="30" width="40" height="34" rx="12" className={styles.head} />
            <circle cx="63" cy="47" r="3.5" className={styles.eye} />
            <circle cx="81" cy="47" r="3.5" className={styles.eye} />
            <line x1="72" y1="30" x2="72" y2="18" className={styles.antennaStem} />
            <circle cx="72" cy="15" r="4" className={styles.antennaTip} />
          </svg>
        </div>
      </div>
    </div>
  );
}
