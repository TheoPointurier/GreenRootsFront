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
  className="fixed inset-0 flex flex-col items-center justify-center z-50 max-h-[70vh] overflow-y-auto rounded-[20px]"
  aria-labelledby="auth-modal-title"
  aria-modal="true"
>

  <div className="bg-white p-6 rounded-[20px] shadow-lg max-w-2xl w-full relative">
    <button
      type="button"
      className="absolute top-2 right-2 text-white bg-greenroots_red rounded-full p-2 hover:bg-greenroots_orange duration-300"
      onClick={onClose}
    >
      ✕
    </button>

    <h2 id="auth-modal-title" className="text-3xl font-bold mb-6 text-center">Connexion requise</h2>
    <p className="mb-6 text-center">Vous devez être connecté pour continuer.</p>

    <div className="flex flex-col md:flex-row justify-center gap-4">
      <button
        ref={loginButtonRef}
        type="button"
        className="bg-greenroots_green text-white px-4 py-2 rounded-full w-full md:w-auto hover:bg-greenroots_orange duration-300"
        onClick={handleLogin}
      >
        Se connecter
      </button>
      <button
        type="button"
        className="bg-greenroots_orange text-white px-4 py-2 rounded-full w-full md:w-auto hover:bg-greenroots_green duration-300"
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
