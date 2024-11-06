// import logo from '../Linkssets/Logos/Logo_principal.webp';
import mountains from '/Images/moutains.svg';
import { Link } from 'react-router-dom';

function Footer () {
  return (
    <footer className='pb-16 mt-5'>
      <div className="hidden lg:flex bg-greenroots_green h-auto z-50">
        <img src={mountains} alt="mountain left" className="w-full h-40 rounded-t-[20px] object-cover transform scale-x-[-1]" />
        <img src={mountains} alt="mountain right" className="w-full h-40 rounded-t-[20px] object-cover" />
      </div>

      <div className="hidden lg:flex bg-greenroots_green items-stretch justify-around flex-row flex-nowrap h-full z-100">
        <span className="flex">
          <Link to="/" className="text-greenroots_white text-xs pl-2 pr-7 pb-2">CGV</Link>
        </span>
        
        <span className="flex">
          <Link to="/" className="text-greenroots_white text-xs pr-7 pb-2">Politique de confidentialité</Link>
        </span>

        {/* <div className="flex-grow flex justify-center">
          <Link to="/" >
            <img src={logo} alt="logo" className="w-50 h-50 -mt-5" />
          </Link>
        </div> */}

        <span className="flex">
          <Link to="/" className="text-greenroots_white text-xs pr-7 pb-2">Mentions légales</Link>
        </span>

        <span className="flex">
          <Link to="/" className="text-greenroots_white text-xs pr-2 pb-2">Contact</Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
