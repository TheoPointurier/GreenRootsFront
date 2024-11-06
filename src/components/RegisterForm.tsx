import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { register, login } from '../api/auth';
import type { RegisterData, LoginData } from '../api/auth';

export default function RegisterForm() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    city: '',
    postal_code: '',
    street: '',
    street_number: '',
    country: '',
    id_role: '1',
    phone_number: '',
    entity_name: '',
    entity_type: '',
    entity_siret: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    const dataToSend: RegisterData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== ''),
    ) as unknown as RegisterData;

    try {
      const registerResponse = await register(dataToSend);
      console.log('Réponse complète du serveur :', registerResponse);
      if (registerResponse.message === 'Utilisateur créé') {
        const loginData: LoginData = {
          email: formData.email,
          password: formData.password,
        };
        const loginResponse = await login(loginData);
        if (loginResponse.accesstoken && loginResponse.user) {
          localStorage.setItem('token', loginResponse.accesstoken);
          localStorage.setItem('userId', loginResponse.user.id.toString());
          setUser(loginResponse.user);
          navigate(`/user/${loginResponse.user.id}`);
        } else {
          setError("Erreur lors de la connexion après l'inscription.");
        }
      } else {
        setError('Erreur lors de la création de votre compte. Veuillez réessayer.');
      }
    } catch (err) {
      console.error("Erreur d'inscription détectée :", err);
      setError("Échec de l'inscription. Veuillez vérifier les informations saisies.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          Prénom
        </label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Nom
        </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          Ville
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="postal_code"
          className="block text-sm font-medium text-gray-700"
        >
          Code postal
        </label>
        <input
          id="postal_code"
          name="postal_code"
          type="text"
          value={formData.postal_code}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="street_number"
          className="block text-sm font-medium text-gray-700"
        >
          Numéro de rue
        </label>
        <input
          id="street_number"
          name="street_number"
          type="number"
          value={formData.street_number}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700"
        >
          Rue
        </label>
        <input
          id="street"
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Pays
        </label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone_number"
          className="block text-sm font-medium text-gray-700"
        >
          Numéro de téléphone
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="entity_name"
          className="block text-sm font-medium text-gray-700"
        >
          Nom de l'entité
        </label>
        <input
          id="entity_name"
          name="entity_name"
          type="text"
          value={formData.entity_name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="entity_type"
          className="block text-sm font-medium text-gray-700"
        >
          Type d'entité
        </label>
        <input
          id="entity_type"
          name="entity_type"
          type="text"
          value={formData.entity_type}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="entity_siret"
          className="block text-sm font-medium text-gray-700"
        >
          SIRET de l'entité
        </label>
        <input
          id="entity_siret"
          name="entity_siret"
          type="text"
          value={formData.entity_siret}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-greenroots_green text-greenroots_white text-xs rounded-full"
      >
        S'inscrire
      </button>
    </form>
  );
}
