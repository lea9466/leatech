import { cn } from '../../../utils/cn';
import styles from './SectionHeader.module.css';

export function SectionHeader({ id, eyebrow, title, description, gradient }) {
  return (
    <header className={styles.header}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id} className={cn(styles.title, gradient && styles.titleGradient)}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </header>
  );
}
