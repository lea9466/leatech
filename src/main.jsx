import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

const container = document.getElementById('root');
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// אחרי build ה-HTML כבר מרונדר מראש (scripts/prerender.mjs) – מתחברים אליו במקום
// לרנדר מחדש. ב-dev התיבה ריקה ורנדור רגיל.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
