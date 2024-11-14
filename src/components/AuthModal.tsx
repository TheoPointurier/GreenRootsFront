import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleRegister = () => {
    navigate('/register');
    onClose();
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    loginButtonRef.current?.focus();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <dialog
      ref={modalRef}
      open
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[20px] shadow-lg"
      aria-labelledby="auth-modal-title"
      aria-modal="true"
      style={{ borderRadius: '20px' }}
    >
      <div className="bg-white p-10 rounded-[20px] shadow-lg max-w-2xl w-full relative">
        <button
          type="button"
          className="absolute top-2 right-2 text-white bg-greenroots_red rounded-full p-2"
          onClick={onClose}
          aria-label="Fermer la modal"
        >
          ✕
        </button>

        <h2 id="auth-modal-title" className="text-3xl font-bold mb-8 text-center">Connexion requise</h2>
        <p className="mb-8 text-center">Vous devez être connecté pour passer à la caisse.</p>

        <div className="flex justify-center gap-6">
          <button
            ref={loginButtonRef}
            type="button"
            className="bg-greenroots_green text-white px-8 py-4 rounded-full text-lg"
            onClick={handleLogin}
          >
            Se connecter
          </button>
          <button
            type="button"
            className="bg-greenroots_orange text-white px-8 py-4 rounded-full text-lg"
            onClick={handleRegister}
          >
            S'enregistrer
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default AuthModal;
