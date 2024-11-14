import type { FormEvent } from 'react';
import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../components/ToastProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });
      const { user, accessToken } = response;

      if (accessToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', user.id.toString());
        setUser(user);
        showSuccessToast('Connexion réussie ! Bienvenue !');
        navigate(`/user/${user.id}`);
      }
    } catch (error) {
      setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
      showErrorToast('Échec de la connexion. Veuillez vérifier vos identifiants.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Champ Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:greenroots_green focus:ring-greenroots_green"
        />
      </div>

      {/* Champ Mot de passe */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:greenroots_green focus:ring-greenroots_green"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-600"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-greenroots_green text-greenroots_white text-xs rounded-full"
      >
        Se connecter
      </button>

      {/* Liens supplémentaires */}
      <div className='flex items-center justify-between'>
        <Link to="/register" className="text-greenroots_green text-[0.6rem] pt-4">
          Créer un compte
        </Link>
        <Link to="/resetpassword" className="text-greenroots_green text-[0.6rem] pt-4">
          Mot de passe oublié
        </Link>
      </div>
    </form>
  );
}
