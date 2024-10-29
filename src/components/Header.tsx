import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import logo from '../assets/Logos/Logo_principal.webp';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  return (
    <header className="fixed bottom-0 left-0 w-full flex items-center p-4 bg-greenroots_green z-50">
      {/* Conteneur pour le menu, aligné à gauche */}
      <div className="flex-1 flex justify-start">
        <FontAwesomeIcon icon={faBars} className="w-8 h-8" />
      </div>
      
      {/* Conteneur pour le logo, centré */}
      <div className="flex-1 flex justify-center">
        <img src={logo} alt="logo" className="w-20 h-20 md:w-16 md:h-16" />
      </div>

      {/* Conteneur pour le panier, aligné à droite */}
      <div className="flex-1 flex justify-end">
        <FontAwesomeIcon icon={faCartShopping} className="w-8 h-8" />
      </div>
    </header>
  );
}

export default Header;
