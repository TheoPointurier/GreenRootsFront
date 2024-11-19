import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

// Composant ToastProvider
function ToastProvider() {
  const [topPosition, setTopPosition] = useState(
    window.matchMedia('(min-width: 1440px)').matches ? '80px' : '0px'
  );

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.matchMedia('(min-width: 1440px)').matches;
      setTopPosition(isDesktop ? '80px' : '0px');
    };

    // Ajoute un listener pour détecter les changements de taille d'écran
    window.addEventListener('resize', handleResize);

    // Nettoie le listener lors du démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
      theme="light"
      style={{
        top: topPosition,
        right: '1rem',
        zIndex: 9999,
      }}
    />
  );
}

// Fonctions utilitaires pour les notifications toast
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export default ToastProvider;
