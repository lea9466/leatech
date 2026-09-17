import { cn } from '../../../utils/cn';
import styles from './Logo.module.css';

export function Logo({ className }) {
  return (
    <span className={cn(styles.logo, className)}>
      <span className={styles.word}>
        <span className={styles.bold}>Lea</span>
        <span className={styles.tick} aria-hidden="true" />
        <span className={styles.light}>Tech</span>
      </span>
    </span>
  );
}
