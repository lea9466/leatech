import { FORM_LIMITS } from '../constants/contactForm';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

/**
 * שולח את הפנייה ל-Webhook (n8n / Make / שרת).
 * בלי ENDPOINT מוגדר – מדמה הצלחה כדי שהאתר יעבוד בהדגמה.
 */
export async function sendContactForm(payload) {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, demo: true };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FORM_LIMITS.requestTimeoutMs);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return { ok: true };
  } finally {
    clearTimeout(timeoutId);
  }
}
