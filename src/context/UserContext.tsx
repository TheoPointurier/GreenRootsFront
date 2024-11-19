import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import apiClient from '../api/apiClient';
import { showSuccessToast } from '../components/ToastProvider';
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
    showSuccessToast('Vous avez été déconnecté avec succès.');
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (isInitialCheckDone.current) return;

      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        try {
          const data = await apiClient(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
        } catch (error) {
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
