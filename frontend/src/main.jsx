import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from './contexts/AuthContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
            <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
