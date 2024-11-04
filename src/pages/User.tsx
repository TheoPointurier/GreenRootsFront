// src/pages/User.tsx

import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import apiClient from '../api/apiClient';
import UserInfo from '../components/UserInfo';

const User: React.FC = () => {
  const { user, setUser } = useUser();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) return;

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vous devez être connecté pour accéder à cette page.');
        return;
      }

      try {
        const response = await apiClient('/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.user);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur:", error);
        setError("Impossible de récupérer vos informations. Veuillez vous reconnecter.");
      }
    };

    fetchUserInfo();
  }, [user, setUser]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement des informations...</p>;

  return (
    <main className="user">
      <UserInfo user={user} />
    </main>
  );
};

export default User;
