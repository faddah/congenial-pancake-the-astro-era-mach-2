import React from 'react';
import ReactDOM from 'react-dom/client';
import CookingCalculatorApp from './CookingCalculatorApp';

// Import base styles
import './styles.css';

// Create root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the app
root.render(
  <React.StrictMode>
    <CookingCalculatorApp />
  </React.StrictMode>
);