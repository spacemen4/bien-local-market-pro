import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from '../supabase'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById("root")!).render(
  <SessionContextProvider supabaseClient={supabase}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </SessionContextProvider>
);
