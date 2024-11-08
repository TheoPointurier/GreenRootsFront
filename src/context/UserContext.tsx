import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import apiClient from '../api/apiClient';
import type { User, UserContextType } from '../@types/users';

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(true);
  const isInitialCheckDone = useRef(false);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (isInitialCheckDone.current) return;

      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      console.log(
        'Token et ID utilisateur récupérés depuis localStorage:',
        token,
        userId,
      );

      if (token && userId) {
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

      isInitialCheckDone.current = true;
      setIsLoading(false);
    };

    checkUserLoggedIn();
  }, [logout]);

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
