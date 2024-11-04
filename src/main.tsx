import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext'; // Importer UserProvider
import router from './router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <UserProvider> {/* Enveloppe l'application pour fournir le contexte utilisateur */}
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
