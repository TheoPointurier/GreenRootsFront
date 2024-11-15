import { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import apiClient from '../api/apiClient';
import UserInfo from '../components/UserInfo';
import OrderHistoryPage from '../components/OrderHistory';
import ReviewCreate from '../components/ReviewCreate';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const User = () => {
  const { user, setUser } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (user) return;

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Vous devez être connecté pour accéder à cette page.');
        return;
      }

      const userId = getUserIdFromToken(token);
      if (!userId) {
        setError('ID utilisateur non trouvé dans le token.');
        return;
      }

      try {
        const response = await apiClient(`/users/${userId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.user);
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des informations utilisateur:',
          error,
        );
        setError(
          'Impossible de récupérer vos informations. Veuillez vous reconnecter.',
        );
      }
    };

    fetchUserInfo();
  }, [user, setUser]);

  const handleAccordionToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement des informations...</p>;

  return (
    <div className="flex flex-col xl:flex-row items-start w-full">
      {/* Accordéon à gauche */}
      <aside className="flex flex-col w-full md:w-80 bg-white p-4 rounded-lg shadow-md gap-2 mx-2">
        <Accordion
          title="Informations utilisateur"
          isOpen={openIndex === 0}
          onToggle={() => handleAccordionToggle(0)}
        />
        <Accordion
          title="Historique des commandes"
          isOpen={openIndex === 1}
          onToggle={() => handleAccordionToggle(1)}
        />
        <Accordion
          title="Créer un avis"
          isOpen={openIndex === 2}
          onToggle={() => handleAccordionToggle(2)}
        />
      </aside>

      {/* Contenu affiché à droite */}
      <main className="flex-1 p-4 md:p-6 w-full">
        {openIndex === 0 && <UserInfo user={user} />}
        {openIndex === 1 && <OrderHistoryPage />}
        {openIndex === 2 && <ReviewCreate />}
      </main>
    </div>
  );
};

export default User;

const getUserIdFromToken = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || null;
  } catch (error) {
    console.error('Erreur lors du décodage du token:', error);
    return null;
  }
};

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}

const Accordion = ({ title, isOpen, onToggle }: AccordionProps) => (
  <div className="w-full">
    <button
      type="button"
      className="flex justify-between items-center w-full text-left p-3 bg-greenroots_green text-greenroots_white border-b border-greenroots_green rounded-md"
      onClick={onToggle}
      aria-expanded={isOpen ? 'true' : 'false'}
    >
      {title}
      <FontAwesomeIcon
        icon={faChevronRight}
        className="ml-5 text-black hidden xl:block"
      />
      <FontAwesomeIcon
        icon={faChevronDown}
        className="ml-5 text-black block xl:hidden"
      />
    </button>
    {isOpen && <div>{/* Contenu à afficher lorsqu'il est ouvert */}</div>}
  </div>
);
