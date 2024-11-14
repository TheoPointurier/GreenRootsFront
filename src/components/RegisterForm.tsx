import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { register, login } from '../api/auth';
import { showSuccessToast, showErrorToast } from '../components/ToastProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import type { RegisterData, LoginData } from '../@types/users';

type RegisterFormData = RegisterData & {
  confirmPassword: string;
};

export default function RegisterForm() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    city: '',
    postal_code: '',
    street: '',
    street_number: '',
    country: '',
    id_role: '1',
    phone_number: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]{12,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!validatePassword(formData.password)) {
      setError(
        'Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    // Préparer les données en excluant `confirmPassword`
    const { confirmPassword, ...dataWithoutConfirmPassword } = formData;
    const dataToSend: RegisterData = {
      ...dataWithoutConfirmPassword,
      street_number: formData.street_number.toString(),
      id_role: formData.id_role.toString(),
      phone_number: formData.phone_number || undefined,
    };

    try {
      const registerResponse = await register(dataToSend);
      console.log('Réponse du serveur :', registerResponse);

      if (registerResponse.message === 'Utilisateur créé') {
        showSuccessToast('Compte créé avec succès ! Vous êtes maintenant connecté.');
        const loginData: LoginData = {
          email: formData.email,
          password: formData.password,
        };
        const loginResponse = await login(loginData);
        if (loginResponse.accessToken && loginResponse.user) {
          localStorage.setItem('token', loginResponse.accessToken);
          localStorage.setItem('userId', loginResponse.user.id.toString());
          setUser(loginResponse.user);
          navigate(`/user/${loginResponse.user.id}`);
        } else {
          setError("Erreur lors de la connexion après l'inscription.");
          showErrorToast("Erreur lors de la connexion après l'inscription.");
        }
      } else {
        setError('Erreur lors de la création de votre compte. Veuillez réessayer.');
        showErrorToast('Erreur lors de la création de votre compte.');
      }
    } catch (err: unknown) {
      console.error("Erreur d'inscription détectée :", err);
      setError("Échec de l'inscription. Veuillez vérifier les informations saisies.");
      showErrorToast("Échec de l'inscription. Veuillez vérifier les informations saisies.");
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10 mb-20 xl:mt-10 xl:mb-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
      <p className="text-sm text-gray-600 mb-4">
        Les champs marqués par <span className="text-red-500">*</span> sont
        obligatoires.
      </p>
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Prénom */}
      <div className="mb-4">
        <label
          htmlFor="firstname"
          className="block text-sm font-medium text-gray-700"
        >
          Prénom <span className="text-red-500">*</span>
        </label>
        <input
          id="firstname"
          name="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Nom */}
      <div className="mb-4">
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Nom <span className="text-red-500">*</span>
        </label>
        <input
          id="lastname"
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Mot de passe */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Mot de passe <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
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

      {/* Indication des règles du mot de passe */}
      <p className="text-xs text-gray-600 mb-4">
        Le mot de passe doit contenir au moins 12 caractères, une majuscule, une
        minuscule, un chiffre et un caractère spécial.
      </p>

      {/* Confirmation du mot de passe */}
      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirmer le mot de passe <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-3 text-gray-600"
          >
            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      {/* Numéro de téléphone (optionnel) */}
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
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Numéro de rue */}
      <div className="mb-4">
        <label
          htmlFor="street_number"
          className="block text-sm font-medium text-gray-700"
        >
          Numéro de rue <span className="text-red-500">*</span>
        </label>
        <input
          id="street_number"
          name="street_number"
          type="number"
          value={formData.street_number}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Rue */}
      <div className="mb-4">
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700"
        >
          Nom de la Rue <span className="text-red-500">*</span>
        </label>
        <input
          id="street"
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Ville */}
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          Ville <span className="text-red-500">*</span>
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Code postal */}
      <div className="mb-4">
        <label
          htmlFor="postal_code"
          className="block text-sm font-medium text-gray-700"
        >
          Code postal <span className="text-red-500">*</span>
        </label>
        <input
          id="postal_code"
          name="postal_code"
          type="text"
          value={formData.postal_code}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Pays */}
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Pays <span className="text-red-500">*</span>
        </label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-greenroots_green text-greenroots_white rounded-full"
      >
        S'inscrire
      </button>
    </form>
  );
}
