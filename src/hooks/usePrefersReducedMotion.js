import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export function usePrefersReducedMotion() {
  // false גם בדפדפן בהתחלה: כך הרינדור הראשון זהה ל-HTML שרונדר מראש (hydration),
  // והערך האמיתי נקבע מיד אחר כך באפקט
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    setPrefersReduced(mediaQuery.matches);
    const handleChange = (event) => setPrefersReduced(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
