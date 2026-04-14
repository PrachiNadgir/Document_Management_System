import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './Context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>

      {/* ✅ Google Provider (optional but needed for Google login) */}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

        {/* ✅ Toast global */}
        <Toaster position="top-center" />

        <App />

      </GoogleOAuthProvider>

    </UserContext>
  </BrowserRouter>
);