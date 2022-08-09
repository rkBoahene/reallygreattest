import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="https://dev-2vqvyfw3.us.auth0.com"
    clientId="ChaKvM2VPJ4spm2tT4KabS1SMYPpMJVX"
    redirectUri={window.location.origin}
    >

      <App />
    </Auth0Provider>
  </React.StrictMode>
);


