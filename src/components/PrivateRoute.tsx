import { useState } from 'react';
import { useUser } from '../context/UserContext';
import AuthModal from './AuthModal';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  // Si l'utilisateur n'est pas connecté, afficher la modal
  if (!user) {
    if (!showModal) setShowModal(true);
    return showModal ? <AuthModal onClose={handleCloseModal} /> : null;
  }

  // Si l'utilisateur est connecté, afficher les composants enfants
  return children;
}

export default PrivateRoute;
