import mountains from '/Images/moutains.svg';
import logo from '../assets/Logos/Logo_principal.webp';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    // Footer visible uniquement sur desktop
    <footer className="hidden xl:flex flex-col w-full relative">
      {/* Section des images montagnes */}
      <div className="flex w-full">
        <img
          src={mountains}
          alt="mountain left"
          className="w-1/2 transform scale-x-[-1]"
        />
        <img
          src={mountains}
          alt="mountain right"
          className="w-1/2"
        />
      </div>

      {/* Section du contenu avec fond vert */}
      <div className="bg-greenroots_green flex flex-col items-center justify-center relative z-0">
        {/* Logo */}
        <img
          src={logo}
          alt="Green Roots Logo"
          className="w-24 h-24 absolute -top-12 z-10"
        />

        {/* Menu des liens */}
        <div className="flex items-center justify-between w-full px-8 py-5">
          <Link to="/about#cgv" className="text-greenroots_white text-sm hover:text-greenroots_orange duration-300">
            CGV
          </Link>
          <Link to="/about#confidentialite" className="text-greenroots_white text-sm hover:text-greenroots_orange duration-300">
            Politique de confidentialité
          </Link>
          <Link to="/about#mentions-legales" className="text-greenroots_white text-sm hover:text-greenroots_orange duration-300">
            Mentions légales
          </Link>
          <Link to="/contact" className="text-greenroots_white text-sm hover:text-greenroots_orange duration-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
