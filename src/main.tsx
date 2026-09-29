import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import 'config/dayjs';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root não encontrado.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
