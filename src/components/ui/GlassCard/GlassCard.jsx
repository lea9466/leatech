import { cn } from '../../../utils/cn';
import styles from './GlassCard.module.css';

/**
 * מעטפת זכוכית רב-פעמית.
 * as – מאפשר לרנדר כ-article / li / div לפי הסמנטיקה של המקום.
 */
export function GlassCard({ as: Component = 'div', children, className, interactive = false, ...rest }) {
  return (
    <Component
      className={cn(styles.card, interactive && styles.interactive, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
