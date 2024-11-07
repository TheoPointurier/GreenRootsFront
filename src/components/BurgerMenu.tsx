import { useEffect } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import type { BurgerMenuProps } from '../@types/BurgerMenu';

const BurgerMenu = ({ isOpen, toggleMenu }: BurgerMenuProps) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleMenu();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.querySelector('.menu-container');
      const burgerIcon = document.querySelector('.burger-icon');

      if (
        menuElement &&
        !menuElement.contains(event.target as Node) &&
        !burgerIcon?.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, toggleMenu]);

  return (
    <>
      {/* Icône du menu burger, visible uniquement sur mobile */}
      <div className="xl:hidden flex-1 flex justify-end">
        <FontAwesomeIcon
          icon={faBars}
          size="xl"
          className="w-8 h-8 m-2 cursor-pointer text-greenroots_white burger-icon"
          onClick={toggleMenu}
        />
      </div>

      {isOpen && (
        <div className="fixed right-0 top-[70px] bottom-[56px] bg-greenroots_green flex flex-col items-end pl-8 pr-6 justify-start z-40 max-w-80 rounded-tl-lg border border-greenroots_orange-500 shadow-lg menu-container xl:hidden">
          <ul className="text-greenroots_white text-xl space-y-4">
            {/* Liens du menu */}
            <li className="pt-7">
              {user ? (
                <button type="button" onClick={handleLogout} className="text-greenroots_white">
                  Déconnexion
                </button>
              ) : (
                <Link to="/login" className="text-greenroots_white" onClick={toggleMenu}>
                  Connexion
                </Link>
              )}
            </li>
            {user && (
              <li className="pt-1">
                <Link to={`/user/${user.id}`} className="text-greenroots_white" onClick={toggleMenu}>
                  Mon compte
                </Link>
              </li>
            )}
            {!user && (
              <li className="pt-1">
                <Link to="/register" onClick={toggleMenu}>
                  S'enregistrer
                </Link>
              </li>
            )}
            <li className="border-t-2 border-b-2 border-greenroots_grey-500 pt-5 pb-5 mr-4">
              <Link to="/panier" onClick={toggleMenu}>Mon panier</Link>
            </li>
            <li className="pt-2"><Link to="/" onClick={toggleMenu}>Accueil</Link></li>
            <li className="pt-2"><Link to="/trees" onClick={toggleMenu}>Nos arbres</Link></li>
            <li className="pt-2"><Link to="/campaigns" onClick={toggleMenu}>Nos campagnes</Link></li>
            <li className="pt-2"><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            <li className="pt-2"><Link to="/about" onClick={toggleMenu}>À propos</Link></li>
          </ul>
          {/* Bouton de fermeture du menu */}
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
