import { useEffect, useState } from 'react';
import { useInView } from '../../../hooks/useInView';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { HubIcon, SpeedIcon, ShieldIcon, CheckIcon } from './TrustIcons';
import styles from './TrustTyping.module.css';

const ICONS = [HubIcon, SpeedIcon, ShieldIcon];
/** קצב הקלדה אנושי, לא רובוטי — לא כולם ביחד, אחד גומר ואז הבא מתחיל */
const CHAR_MS = 70;
const PAUSE_AFTER_MS = 750;

/**
 * שלושה "מסכים" קטנים במסגרת דפדפן (אותה שפה חזותית כמו כרטיסי
 * הפרויקטים), וכל אחד "מקליד" את כותרת הנקודה שלו בזמן אמת עם סמן
 * מהבהב. המסכים לא מתחילים ביחד — כל אחד מתחיל רק אחרי שהקודם סיים
 * לגמרי להקליד ולהציג את המשפט המסביר, בקצב אנושי רגיל.
 */
function TypingScreen({ point, index, active, startDelay }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [charCount, setCharCount] = useState(0);
  const [appeared, setAppeared] = useState(false);
  const Icon = ICONS[index];
  const done = charCount >= point.title.length;

  useEffect(() => {
    if (!active) return undefined;
    if (prefersReducedMotion) {
      setAppeared(true);
      setCharCount(point.title.length);
      return undefined;
    }

    let interval;
    const startTimer = setTimeout(() => {
      setAppeared(true);
      interval = setInterval(() => {
        setCharCount((c) => {
          if (c >= point.title.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, CHAR_MS);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [active, prefersReducedMotion, point.title, startDelay]);

  return (
    <div className={styles.wrap}>
      <div className={appeared ? styles.glowIn : styles.glow} />
      <div className={appeared ? styles.screenIn : styles.screen}>
        <div className={styles.bar}>
          <span className={done ? styles.dotsRelight : styles.dots} dir="ltr" aria-hidden="true">
            <span className={styles.dotRed} />
            <span className={styles.dotAmber} />
            <span className={styles.dotGreen} />
          </span>
          <span className={styles.barIcon}>
            <Icon className={styles.barIconGlyph} />
          </span>
        </div>
        <div className={styles.body} aria-hidden="true">
          <p className={styles.typedTitle}>
            <span className={styles.typedTitleText}>
              {point.title.slice(0, charCount)}
              {!done && <span className={styles.cursor} />}
            </span>
            {done && (
              <span className={styles.checkBadge}>
                <CheckIcon className={styles.checkGlyph} />
              </span>
            )}
          </p>
          <p className={done ? styles.typedTextIn : styles.typedText}>{point.text}</p>
        </div>
        <span className="visually-hidden">
          {point.title}. {point.text}
        </span>
      </div>
    </div>
  );
}

export function TrustTyping({ trustPoints }) {
  const [ref, inView] = useInView({ threshold: 0.3 });

  // זמן התחלה מצטבר: כל מסך מתחיל בדיוק כשקודמו סיים להקליד + נשם רגע
  let cumulative = 0;
  const startDelays = trustPoints.map((point) => {
    const delay = cumulative;
    cumulative += point.title.length * CHAR_MS + PAUSE_AFTER_MS;
    return delay;
  });

  return (
    <div ref={ref} className={styles.grid}>
      {trustPoints.map((point, index) => (
        <TypingScreen
          key={point.title}
          point={point}
          index={index}
          active={inView}
          startDelay={startDelays[index]}
        />
      ))}
    </div>
  );
}
