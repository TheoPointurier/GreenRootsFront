import type { FormEvent } from 'react';
import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function LoginForm() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password });
      const { user, accesstoken } = response;

      // Stocke le token dans le localStorage
      if (accesstoken) {
        localStorage.setItem('token', accesstoken);
      }

      // Met à jour le contexte utilisateur
      setUser(user);

      // Redirige vers la page d'accueil après connexion
      navigate('/');
    } catch (error) {
      console.error("Erreur de connexion", error);
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Se connecter
      </button>
    </form>
  );
}
