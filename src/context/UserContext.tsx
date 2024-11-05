import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  city: string;
  postal_code: string;
  street: string;
  street_number: number;
  country: string;
  id_role: number;
  phone_number?: string;
  entity_name?: string;
  entity_type?: string;
  entity_siret?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fonction de déconnexion
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  // Fonction pour récupérer les informations utilisateur en fonction de l'ID
  const fetchUserInfo = useCallback(async (userId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token non défini");
      return;
    }

    try {
      const response = await apiClient(`/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur:", error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userId = getUserIdFromToken(token);
        if (userId) {
          await fetchUserInfo(userId);
        } else {
          console.error("ID utilisateur non trouvé dans le token");
          logout();
        }
      }
    };

    checkUserLoggedIn();
  }, [fetchUserInfo, logout]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Fonction pour décoder l'ID utilisateur depuis le token
const getUserIdFromToken = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null;
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }
};
