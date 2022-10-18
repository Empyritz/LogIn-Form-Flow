import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import AuthProvider from './Firebase/authContext';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
