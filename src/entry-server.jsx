import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

/** נקרא רק בזמן ה-build מ-scripts/prerender.mjs – מחזיר את ה-HTML של הדף המלא. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
