import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FORM_LIMITS } from '../../../constants/contactForm';
import { sendContactForm } from '../../../services/contactService';
import { sanitizeText } from '../../../utils/sanitize';
import { CONTACT_DEFAULT_VALUES, contactSchema } from './contactSchema';

export const SUBMIT_STATUS = Object.freeze({
  idle: 'idle',
  success: 'success',
  error: 'error',
  cooldown: 'cooldown',
});

/**
 * כל הלוגיקה של הטופס במקום אחד – הרכיב נשאר תצוגה בלבד.
 */
export function useContactForm() {
  const [status, setStatus] = useState(SUBMIT_STATUS.idle);
  const mountedAtRef = useRef(Date.now());
  const lastSubmitRef = useRef(0);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: CONTACT_DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const onSubmit = useCallback(
    async ({ website, ...values }) => {
      const now = Date.now();

      // Honeypot מולא או שליחה מהירה מדי → בוט. מציגים הצלחה כדי לא לחשוף את המנגנון.
      const isBot = Boolean(website) || now - mountedAtRef.current < FORM_LIMITS.minFillTimeMs;
      if (isBot) {
        setStatus(SUBMIT_STATUS.success);
        form.reset();
        return;
      }

      // הגבלת קצב בצד הלקוח (מניעת לחיצות כפולות). הגבלה אמיתית – בשרת.
      if (now - lastSubmitRef.current < FORM_LIMITS.cooldownMs) {
        setStatus(SUBMIT_STATUS.cooldown);
        return;
      }

      const payload = {
        name: sanitizeText(values.name),
        email: sanitizeText(values.email),
        projectType: values.projectType,
        message: sanitizeText(values.message),
        submittedAt: new Date(now).toISOString(),
      };

      try {
        await sendContactForm(payload);
        lastSubmitRef.current = now;
        setStatus(SUBMIT_STATUS.success);
        form.reset();
      } catch {
        setStatus(SUBMIT_STATUS.error);
      }
    },
    [form]
  );

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
    trigger: form.trigger,
    setValue: form.setValue,
    getValues: form.getValues,
    status,
  };
}
