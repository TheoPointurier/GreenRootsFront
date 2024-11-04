import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../context/UserContext';

type BurgerMenuProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const BurgerMenu = ({ isOpen, toggleMenu }: BurgerMenuProps) => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  return (
    <>
      {/* Icône d'ouverture du menu */}
      <div className="flex-1 flex justify-end">
        <FontAwesomeIcon 
          icon={faBars} 
          size="sm" 
          className="w-8 h-8 m-2 cursor-pointer text-greenroots_white" 
          onClick={toggleMenu} 
        />
      </div>

      {/* Contenu du menu burger */}
      {isOpen && (
        <div className="fixed right-0 top-[70px] bottom-[56px] bg-greenroots_green flex flex-col items-end pl-8 pr-6 justify-start z-40 max-w-80 rounded-tl-lg border border-greenroots_orange-500 shadow-lg">
          <ul className="text-greenroots_white text-xl space-y-4">
            {/* Lien vers la page de connexion ou déconnexion */}
            <li className="pt-10">
              {user ? (
                <button type="button" onClick={handleLogout} className="text-greenroots_white">
                  Déconnexion
                </button>
              ) : (
                <a href="/login" className="text-greenroots_white">
                  Connexion
                </a>
              )}
            </li>

            {/* Lien vers le compte utilisateur si connecté */}
            {user && (
              <li className="pt-5">
                <a href={`/user/${user.id}`} className="text-greenroots_white">
                  Compte
                </a>
              </li>
            )}

            {/* Autres liens du menu */}
            <li className="border-b-2 border-greenroots_grey-500 pt-3 pb-10 ml-2 mr-4">
              <a href="/panier">Mon panier</a>
            </li>
            <li className="pt-10"><a href="/">Accueil</a></li>
            <li className="pt-5"><a href="/trees">Nos arbres</a></li>
            <li className="pt-5"><a href="/campaigns">Nos campagnes</a></li>
            <li className="pt-5"><a href="/a-propos">À propos</a></li>
          </ul>

          {/* Bouton de fermeture */}
          <div className="absolute bottom-5 right-2 flex items-center">
            <span className="text-greenroots_white text-lg pr-10">Green Roots</span>
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
