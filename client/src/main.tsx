import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { GlobalStyles } from './styles/global.styles.ts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <ToastContainer
      autoClose={3000}
      theme="colored"
      pauseOnHover={false}
      closeOnClick
    />
    <App />
  </React.StrictMode>,
);
