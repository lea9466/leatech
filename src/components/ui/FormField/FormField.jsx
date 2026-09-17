import { cloneElement, useId } from 'react';
import styles from './FormField.module.css';

/**
 * עוטף שדה טופס: label, הודעת שגיאה ו-aria מחוברים אוטומטית.
 * children – אלמנט input / textarea / select יחיד.
 */
export function FormField({ label, error, children }) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  const control = cloneElement(children, {
    id: fieldId,
    className: styles.control,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': error ? errorId : undefined,
  });

  return (
    <div className={styles.field}>
      <label htmlFor={fieldId} className={styles.label}>{label}</label>
      {control}
      {error && (
        <p id={errorId} className={styles.error} role="alert">{error}</p>
      )}
    </div>
  );
}
