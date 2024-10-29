import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import logo from '../assets/Logos/Logo_principal.webp';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed bottom-0 left-0 w-full flex items-end bg-greenroots_green z-50 h-15">
        {/* Left menu icon */}
        <div className="flex-1 flex justify-start">
          <FontAwesomeIcon icon={faBars} size="sm" className="w-8 h-8 m-2 cursor-pointer text-white" onClick={toggleMenu} />
        </div>

        {/* Center logo*/}
        <div className="flex-1 flex justify-center">
          <a href="/">
            <img src={logo} alt="logo" className="w-30 h-30 max-w-14" />
          </a>
        </div>

        {/* Right basket icon */}
        <div className="flex-1 flex justify-end">
          <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8 m-2 text-white" />
        </div>
      </header>

      {/* Burger menu  */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-20 bg-greenroots_orange flex flex-col items-left pl-2 justify-start z-40 max-w-80">
          
          {/* Menu list */}
          <ul className="text-white text-2xl space-y-4">
            <li className='pt-10'><a href="/user">Compte/Connexion</a></li>
            <li className="border-b-2 border-greenroots_grey-500 pt-3 pb-10 ml-2 mr-4"><a href="/panier">Mon panier</a></li>
            <li className='pt-10'><a href="/">Accueil</a></li>
            <li className='pt-5'><a href="/trees">Nos arbres</a></li>
            <li className='pt-5'><a href="/campaigns">Nos campagnes</a></li>
            <li className='pt-5'><a href="/a-propos">À propos</a></li>
          </ul>

          {/* Close button */}
          <div className="absolute bottom-16 left-2 flex items-center">
            <FontAwesomeIcon icon={faTimes} className="w-8 h-8 text-white text-1xl space-y-4 cursor-pointer" onClick={toggleMenu} />
            <span className="text-white text-lg pl-10">Green Roots</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
