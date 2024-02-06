import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx';
import CartProvider from './context/ShoppingCartContext.jsx';
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider
        options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID, currency: 'USD' }}
      >
      <AuthProvider>
        <CartProvider>
         <App />
        </CartProvider>
      </AuthProvider>
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
