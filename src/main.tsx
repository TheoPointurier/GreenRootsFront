import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Router from './router'; // Assurez-vous que `Router` est bien importé

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UserProvider> {/* Enveloppe l'application pour fournir le contexte utilisateur */}
      <CartProvider>
        <Router /> {/* Utilisation de notre composant `Router` */}
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
