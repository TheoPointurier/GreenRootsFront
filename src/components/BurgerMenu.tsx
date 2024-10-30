import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type BurgerMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const BurgerMenu = ({ isOpen, toggleMenu }: BurgerMenuProps) => {
  return (
    <>
      {/* Icone d'ouverture du menu */}
      <div className="flex-1 flex justify-start">
        <FontAwesomeIcon 
          icon={faBars} 
          size="sm" 
          className="w-8 h-8 m-2 cursor-pointer text-greenroots_white" 
          onClick={toggleMenu} 
        />
      </div>

      {/* Contenu du menu burger */}
      {isOpen && (
        <div className="fixed inset-0 top-[70px] bottom-[56px] bg-greenroots_green flex flex-col items-start pl-2 justify-start z-40 max-w-80 rounded-tr-lg border border-greenroots_orange-500 shadow-lg">
          <ul className="text-greenroots_white text-2xl space-y-4">
            <li className='pt-10'><a href="/user">Compte / Connexion</a></li>
            <li className="border-b-2 border-greenroots_grey-500 pt-3 pb-10 ml-2 mr-4"><a href="/panier">Mon panier</a></li>
            <li className='pt-10'><a href="/">Accueil</a></li>
            <li className='pt-5'><a href="/trees">Nos arbres</a></li>
            <li className='pt-5'><a href="/campaigns">Nos campagnes</a></li>
            <li className='pt-5'><a href="/a-propos">À propos</a></li>
          </ul>

          {/* Bouton de fermeture */}
          <div className="absolute bottom-16 left-2 flex items-center">
            <FontAwesomeIcon 
              icon={faTimes} 
              className="w-8 h-8 text-greenroots_white text-1xl cursor-pointer" 
              onClick={toggleMenu} 
            />
            <span className="text-greenroots_white text-lg pl-10">Green Roots</span>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
