import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import styles from './ScrollRobot.module.css';

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const remap = (v, a, b) => clamp01((v - a) / (b - a));

/**
 * רובוט קטן שנכנס מצד שמאל של המסך תוך כדי גלילה בין "מי אני" ל"שירותים",
 * הולך קצת, ואז מרים פנס שנדלק — כל השלבים קשורים ישירות למיקום הגלילה
 * (לא אנימציה חד-פעמית), כדי שהתחושה תהיה "תוך כדי שגוללים".
 */
export function ScrollRobot() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.15;
      setProgress(remap(start - rect.top, 0, start - end));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  const walk = remap(progress, 0, 0.5);
  const arm = remap(progress, 0.45, 0.7);
  const lit = remap(progress, 0.68, 1);
  const walking = walk > 0.02 && walk < 0.98;

  const style = reducedMotion
    ? undefined
    : { '--walk': walk, '--arm': arm, '--lit': lit };

  return (
    <div className={styles.section} aria-hidden="true">
      <div className={styles.container}>
        <div ref={ref} className={styles.figure} style={style} data-walking={walking || undefined}>
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
