import { useEffect } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import type { BurgerMenuProps } from '../@types/BurgerMenu';

const BurgerMenu = ({ isOpen, toggleMenu }: BurgerMenuProps) => {
  // Récupère l'utilisateur courant et la fonction de déconnexion depuis le contexte utilisateur
  const { user, logout } = useUser();
  // Hook pour naviguer programmatique vers d'autres pages
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    // Déconnecte l'utilisateur
    logout();
    // PErmet de fermer le menu burger
    toggleMenu();
    // Redirige l'utilisateur vers la page d'accueil
    navigate('/');
  };

  // useEffect pour ajouter un écouteur de clics lorsque le menu est ouvert
  useEffect(() => {
    // Fonction qui ferme le menu si l'utilisateur clique à l'extérieur du menu
    const handleClickOutside = (event: MouseEvent) => {
      // Sélectionne le menu burger et l'icône d'ouverture du menu
      const menuElement = document.querySelector('.menu-container');
      const burgerIcon = document.querySelector('.burger-icon');

      // Vérifie si le clic est en dehors du menu et n'est pas sur l'icône du burger
      if (
        menuElement &&
        !menuElement.contains(event.target as Node) && // Si l'élément cliqué n'est pas à l'intérieur du menu
        !burgerIcon?.contains(event.target as Node) // Et si l'élément cliqué n'est pas l'icône du burger
      ) {
        toggleMenu(); // Ferme le menu
      }
    };

    // Ajoute l'écouteur d'événements si le menu est ouvert
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    // Nettoie l'écouteur lorsqu'il n'est plus nécessaire pour éviter des fuites de mémoire
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, toggleMenu]); // useEffect est déclenché lorsqu'une des dépendances change

  return (
    <>
      {/* Icône d'ouverture du menu */}
      <div className="flex-1 flex justify-end">
        <FontAwesomeIcon
          icon={faBars}
          size="sm"
          className="w-8 h-8 m-2 cursor-pointer text-greenroots_white burger-icon"
          onClick={toggleMenu}
        />
      </div>

      {/* Contenu du menu burger */}
      {isOpen && (
        <div className="fixed right-0 top-[70px] bottom-[56px] bg-greenroots_green flex flex-col items-end pl-8 pr-6 justify-start z-40 max-w-80 rounded-tl-lg border border-greenroots_orange-500 shadow-lg menu-container">
          <ul className="text-greenroots_white text-xl space-y-4">
            {/* Lien vers la page de connexion ou déconnexion */}
            <li className="pt-7">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-greenroots_white"
                >
                  Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-greenroots_white"
                  onClick={toggleMenu}
                >
                  Connexion
                </Link>
              )}
            </li>

            {/* Lien vers le compte utilisateur si connecté */}
            {user && (
              <li className="pt-1">
                <Link
                  to={`/user/${user.id}`}
                  className="text-greenroots_white"
                  onClick={toggleMenu}
                >
                  Mon compte
                </Link>
              </li>
            )}
            {/* Lien "S'enregistrer" seulement si l'utilisateur n'est pas connecté */}
            {!user && (
              <li className="pt-1">
                <Link to="/register" onClick={toggleMenu}>
                  S'enregistrer
                </Link>
              </li>
            )}

            {/* Autres liens du menu */}
            <li className="border-t-2 border-b-2 border-greenroots_grey-500 pt-5 pb-5 mr-4">
              <Link to="/panier" onClick={toggleMenu}>
                Mon panier
              </Link>
            </li>
            <li className="pt-2">
              <Link to="/" onClick={toggleMenu}>
                Accueil
              </Link>
            </li>
            <li className="pt-2">
              <Link to="/trees" onClick={toggleMenu}>
                Nos arbres
              </Link>
            </li>
            <li className="pt-2">
              <Link to="/campaigns" onClick={toggleMenu}>
                Nos campagnes
              </Link>
            </li>
            <li className="pt-2">
              <Link to="/contact" onClick={toggleMenu}>
                Contact
              </Link>
            </li>
            <li className="pt-2">
              <Link to="/about" onClick={toggleMenu}>
                À propos
              </Link>
            </li>
          </ul>

          {/* Bouton de fermeture */}
          <div className="absolute bottom-5 right-2 flex items-center">
            <FontAwesomeIcon
              icon={faTimes}
              className="w-8 h-8 text-greenroots_white text-1xl cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
