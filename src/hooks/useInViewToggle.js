import { useEffect, useRef, useState } from 'react';

/**
 * true/false לפי מצב החיתוך הנוכחי בפועל עם התצוגה — לא נדבק ל-true
 * כמו useInView. מתאים לאפקטים שגם נעלמים כשגוללים בחזרה, לא רק
 * "נבנים" פעם אחת ונשארים.
 */
export function useInViewToggle({ threshold = 0.2 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
