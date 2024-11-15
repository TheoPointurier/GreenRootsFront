import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import { useUser } from '../context/UserContext';
import logo from '../assets/Logos/Logo_principal.webp';

function Header() {
  // État pour contrôler l'ouverture du menu burger
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Récupération des informations de l'utilisateur et de la fonction de déconnexion
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Fonction pour basculer l'état du menu burger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* HEADER VERSION PC (en haut de la page) */}
      <header className="fixed top-0 left-0 w-full bg-greenroots_green h-[80px] xl:flex xl:items-center xl:justify-between hidden z-50">
        {/* Logo à gauche */}
        <div className="flex items-center justify-start ml-6">
          <Link to="/">
            <img src={logo} alt="logo" className="w-18 h-18 xl:w-20" />
          </Link>
        </div>

        {/* Menu horizontal uniquement sur PC */}
        <nav className="flex space-x-4 text-greenroots_white flex-1 justify-center ml-10 mr-5">
          <div className="flex space-x-4 flex-1 justify-center">
            <Link to="/" className="text-xl">
              Accueil
            </Link>
            <Link to="/trees" className="text-xl">
              Nos arbres
            </Link>
            <Link to="/campaigns" className="text-xl">
              Nos campagnes
            </Link>
            <Link to="/contact" className="text-xl">
              Contact
            </Link>
            <Link to="/about" className="text-xl">
              À propos
            </Link>
          </div>
          <div className="flex space-x-4">
            {user ? (
              <>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xl text-greenroots_white"
                >
                  Déconnexion
                </button>
                <Link to={`/user/${user.id}`} className="text-xl">
                  Mon compte
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-xl">
                  Connexion
                </Link>
                <Link to="/register" className="text-xl">
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Panier à droite */}
        <div className="flex items-center justify-end mr-6">
          <Link to="/panier" aria-label="Voir le contenu de mon panier">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="w-8 h-8 text-greenroots_white"
            />
          </Link>
        </div>
      </header>

      {/* HEADER VERSION MOBILE / TABLETTE (en bas de la page) */}
      <header className="fixed bottom-0 left-0 w-full bg-greenroots_green z-50 xl:hidden flex items-center justify-between">
        {/* Panier à gauche pour mobile */}
        <div className="flex items-center justify-start ml-3">
          <Link to="/panier" aria-label="Voir le contenu de mon panier">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="w-6 h-6 text-greenroots_white"
            />
          </Link>
        </div>

        {/* Logo centré pour mobile */}
        <div className="flex items-center justify-center flex-1">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 h-12" />
          </Link>
        </div>

        {/* BurgerMenu à droite pour mobile */}
        <div className="flex items-center justify-end mr-1">
          <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </header>
    </>
  );
}

export default Header;
