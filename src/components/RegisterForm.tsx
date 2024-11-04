// src/components/RegisterForm.tsx

import React, { useState, FormEvent } from 'react';
import type { User } from '../context/UserContext'; 
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { register } from '../api/auth';


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
    id_role: '1', // Définir un rôle par défaut si nécessaire
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
    setError(null); // Réinitialise l'erreur
  
    // Crée une copie des données du formulaire en filtrant les champs vides
    const dataToSend = { ...formData };
    if (!dataToSend.phone_number) delete dataToSend.phone_number;
    if (!dataToSend.entity_name) delete dataToSend.entity_name;
    if (!dataToSend.entity_type) delete dataToSend.entity_type;
    if (!dataToSend.entity_siret) delete dataToSend.entity_siret;
  
    try {
      const registeredUser = await register(dataToSend);
  
      // Enregistre les informations utilisateur dans le contexte après l'inscription
      setUser({
        id: registeredUser.id,
        email: formData.email,
        firstname: formData.firstname,
        lastname: formData.lastname,
        city: formData.city,
        postal_code: formData.postal_code,
        street: formData.street,
        street_number: parseInt(formData.street_number, 10),
        country: formData.country,
        id_role: parseInt(formData.id_role, 10),
        phone_number: formData.phone_number || undefined,
        entity_name: formData.entity_name || undefined,
        entity_type: formData.entity_type || undefined,
        entity_siret: formData.entity_siret || undefined,
      });
  
      // Redirige vers la page d'accueil ou une autre page
      navigate('/');
    } catch (error) {
      console.error("Erreur d'inscription", error);
      setError("Échec de l'inscription. Veuillez vérifier les informations saisies.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          name="firstname"
          type="text"
          value={formData.firstname}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          name="lastname"
          type="text"
          value={formData.lastname}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Ville</label>
        <input
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Code postal</label>
        <input
          name="postal_code"
          type="text"
          value={formData.postal_code}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Rue</label>
        <input
          name="street"
          type="text"
          value={formData.street}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Numéro de rue</label>
        <input
          name="street_number"
          type="number"
          value={formData.street_number}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Pays</label>
        <input
          name="country"
          type="text"
          value={formData.country}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
        <input
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nom de l'entité</label>
        <input
          name="entity_name"
          type="text"
          value={formData.entity_name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Type d'entité</label>
        <input
          name="entity_type"
          type="text"
          value={formData.entity_type}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">SIRET de l'entité</label>
        <input
          name="entity_siret"
          type="text"
          value={formData.entity_siret}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        S'inscrire
      </button>
    </form>
  );
}
