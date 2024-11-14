import mountains from '/Images/moutains.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-greenroots_green flex flex-col items-center justify-center">
      {/* Section des montagnes visible uniquement sur desktop */}
      <div className="hidden xl:flex bg-greenroots_green h-auto z-50">
        <img src={mountains} alt="mountain left" className="w-full h-40 rounded-t-[20px] object-cover transform scale-x-[-1]" />
        <img src={mountains} alt="mountain right" className="w-full h-40 rounded-t-[20px] object-cover" />
      </div>

      {/* Menu des liens, flex en mode desktop */}
      <div className="hidden xl:flex bg-greenroots_green items-stretch justify-around flex-row flex-nowrap h-full z-100">
        <Link to="/about#cgv" className="text-greenroots_white text-xs pl-2 pr-7 pb-2">CGV</Link>
        <Link to="/about#confidentialite" className="text-greenroots_white text-xs pr-7 pb-2">Politique de confidentialité</Link>
        <Link to="/about#mentions-legales" className="text-greenroots_white text-xs pr-7 pb-2">Mentions légales</Link>
        <Link to="/contact" className="text-greenroots_white text-xs pr-2 pb-2">Contact</Link>
      </div>
    </footer>
  );
}

export default Footer;
