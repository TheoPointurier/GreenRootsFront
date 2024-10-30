// import logo from '../assets/Logos/Logo_principal.webp';
import mountains from '../../public/Images/moutains.svg';

function Footer () {
  return (
    <footer className='pb-16 mt-5'>
      <div className="flex bg-greenroots_green h-auto">
        <img src={mountains} alt="mountain left" className="w-1/2 h-auto transform scale-x-[-1]" />
        <img src={mountains} alt="mountain right" className="w-1/2 h-auto" />
      </div>

      <div className="flex bg-greenroots_green items-center justify-around flex-row flex-nowrap h-auto">
        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pl-2 pr-2">CGV</a>
        </span>
      
        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pl-2">Politique de confidentialité</a>
        </span>

        {/* <div className="flex-grow flex justify-center">
          <a href="/" >
            <img src={logo} alt="logo" className="w-50 h-50 -mt-5" />
          </a>
        </div> */}

        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pr-2">Mentions légales</a>
        </span>

        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pl-2 pr-2">Contact</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;