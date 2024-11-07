import { useState } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Logos/Logo_principal.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* HEADER VERSION PC / TABLETTE (en haut de la page) */}
      <header className="w-full bg-greenroots_green py-0.5 px-1 2xl:flex 2xl:items-center 2xl:justify-between hidden xl:flex">
        {/* Logo à gauche */}
        <div className="flex items-center justify-start">
          <Link to="/">
            <img src={logo} alt="logo" className="w-18 h-auto 2xl:w-20" />
          </Link>
        </div>

        {/* Menu horizontal uniquement sur tablette et PC */}
        <nav className="flex space-x-4 text-greenroots_white flex-1 justify-center">
          <Link to="/" className="text-xl">Accueil</Link>
          <Link to="/trees" className="text-xl">Nos arbres</Link>
          <Link to="/campaigns" className="text-xl">Nos campagnes</Link>
          <Link to="/contact" className="text-xl">Contact</Link>
          <Link to="/about" className="text-xl">À propos</Link>
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

        {/* Logo centré pour mobile */}
        <div className="flex items-center justify-center flex-1">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 h-auto" />
          </Link>
        </div>

        {/* BurgerMenu à droite pour mobile */}
        <div className="flex items-center justify-end">
          <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </header>
    </>
  );
}

export default Header;
