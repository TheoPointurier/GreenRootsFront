import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Router from './router';
import ToastProvider from './components/ToastProvider';


createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UserProvider> {/* Enveloppe l'application pour fournir le contexte utilisateur */}
      <CartProvider> {/* Enveloppe l'application pour fournir le contexte du panier */}
          <Router /> {/* Utilisation de notre composant `Router` */}
          <ToastProvider /> {/* Enveloppe l'application pour fournir le contexte des toasts */}
      </CartProvider>
    </UserProvider>
  </StrictMode>
);