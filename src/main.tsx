import React from 'react';
import ReactDOM from 'react-dom/client';
import ColorPickerApp from './color-picker-app.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorPickerApp />
  </React.StrictMode>,
);
