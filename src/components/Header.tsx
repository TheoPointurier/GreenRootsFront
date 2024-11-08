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
  // Hook pour naviguer dans l'application
  const navigate = useNavigate();

  // Fonction pour basculer l'état du menu burger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    // Appel de la fonction de déconnexion
    logout();
    // Redirection vers la page d'accueil après la déconnexion
    navigate('/');
  };

  return (
    <>
      {/* HEADER VERSION PC (en haut de la page) */}
      <header className="w-full bg-greenroots_green py-0.5 px-1 xl:flex xl:items-center xl:justify-between hidden">
        {/* Logo à gauche */}
        <div className="flex items-center justify-start">
          <Link to="/">
            <img src={logo} alt="logo" className="w-18 h-auto xl:w-20" />
          </Link>
        </div>

        {/* Menu horizontal uniquement sur PC */}
        <nav className="flex space-x-4 text-greenroots_white flex-1 justify-center">
          {/* Liens principaux du site */}
          <Link to="/" className="text-xl">Accueil</Link>
          <Link to="/trees" className="text-xl">Nos arbres</Link>
          <Link to="/campaigns" className="text-xl">Nos campagnes</Link>
          <Link to="/contact" className="text-xl">Contact</Link>
          <Link to="/about" className="text-xl">À propos</Link>

          {/* Liens conditionnels basés sur l'état de l'utilisateur */}
          {user ? (
            <>
              {/* Si l'utilisateur est connecté, affichage du bouton de déconnexion */}
              <button type="button" onClick={handleLogout} className="text-xl text-greenroots_white">Déconnexion</button>
              {/* Lien vers la page de profil de l'utilisateur */}
              <Link to={`/user/${user.id}`} className="text-xl">Mon compte</Link>
            </>
          ) : (
            <>
              {/* Si l'utilisateur n'est pas connecté, affichage des liens de connexion et d'inscription */}
              <Link to="/login" className="text-xl">Connexion</Link>
              <Link to="/register" className="text-xl">S'enregistrer</Link>
            </>
          )}
        </nav>

        {/* Panier à droite */}
        <div className="flex items-center justify-end">
          <Link to="/panier">
            <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8 text-greenroots_white" />
          </Link>
        </div>
      </header>

      {/* HEADER VERSION MOBILE / TABLETTE (en bas de la page) */}
      <header className="fixed bottom-0 left-0 w-full bg-greenroots_green z-50 xl:hidden flex items-center justify-between py-0.5 px-1">
        {/* Panier à gauche pour mobile */}
        <div className="flex items-center justify-start">
          <Link to="/panier">
            <FontAwesomeIcon icon={faCartShopping} className="w-6 h-6 text-greenroots_white" />
          </Link>
        </div>

        {/* Logo centré pour mobile et tablette */}
        <div className="flex items-center justify-center flex-1">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 h-auto" />
          </Link>
        </div>

        {/* BurgerMenu à droite pour mobile et tablette */}
        <div className="flex items-center justify-end">
          <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </header>
    </>
  );
}

export default Header;
