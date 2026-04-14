import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 🧠 Importamos el contexto global
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    {/* 🌍 Envolvemos la app con el provider */}
    <AuthProvider>
      <App />
    </AuthProvider>

  </React.StrictMode>
);

// 📊 (Opcional) métricas de rendimiento
reportWebVitals();
