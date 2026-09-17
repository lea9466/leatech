import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { isExternalUrl, isSafeUrl } from '../../../utils/sanitize';
import styles from './Button.module.css';

/**
 * כפתור אחיד לכל האתר.
 * href → נרנדר כקישור. קישור חיצוני מקבל אוטומטית target + rel מאובטחים.
 * href לא בטוח (javascript: וכו') לא ירונדר כקישור בכלל.
 */
export const Button = forwardRef(function Button(
  { variant = 'primary', href, children, className, type = 'button', ...rest },
  ref
) {
  const classes = cn(styles.button, styles[variant], className);

  if (href) {
    const isAnchor = href.startsWith('#');
    if (!isAnchor && !isSafeUrl(href)) return null;

    const externalProps = isExternalUrl(href)
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a ref={ref} href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {children}
    </button>
  );
});
