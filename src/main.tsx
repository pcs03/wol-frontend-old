import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider
    authName="_auth"
    authType="cookie"
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>,
);
