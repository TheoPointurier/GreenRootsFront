import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
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

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log(
        'Token et ID utilisateur récupérés depuis localStorage:',
        token,
        userId,
      );

      if (token && userId && !user) {
        try {
          const data = await apiClient(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          console.log("Données utilisateur récupérées depuis l'API:", data);
          setUser(data);
          console.log('Utilisateur mis à jour dans le contexte:', data);
        } catch (error) {
          console.error(
            'Erreur lors de la récupération des informations utilisateur:',
            error,
          );
          logout();
        }
      }
    };

    checkUserLoggedIn();
  }, [user, logout]);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
