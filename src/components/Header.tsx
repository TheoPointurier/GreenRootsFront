import { useState } from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Logos/Logo_principal.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BurgerMenu from './BurgerMenu';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed bottom-0 left-0 w-full flex items-center bg-greenroots_green z-50 p-18">

        {/* Icône du panier */}
        <div className="flex-1 flex justify-start">
        <Link to="/panier">
          <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8 m-2 text-greenroots_white" />
        </Link>
        </div>

        {/* Logo central */}
        <div className="flex-1 flex justify-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-30 h-30 max-w-14" />
          </Link>
        </div>

        {/* Menu burger */}
        <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
    </>
  );
}

export default Header;
