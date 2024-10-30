// import logo from '../assets/Logos/Logo_principal.webp';
import mountains from '../../public/Images/moutains.svg';

function Footer () {
  return (
    <footer className='pb-16 mt-5'>
      <div className="hidden lg:flex bg-greenroots_green h-auto z-50">
        <img src={mountains} alt="mountain left" className="w-full h-40 rounded-t-[20px] object-cover transform scale-x-[-1]" />
        <img src={mountains} alt="mountain right" className="w-full h-40 rounded-t-[20px] object-cover" />
      </div>

      <div className="hidden lg:flex bg-greenroots_green items-stretch justify-around flex-row flex-nowrap h-full z-100">
        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pl-2 pr-7 pb-2">CGV</a>
        </span>
        
        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pr-7 pb-2">Politique de confidentialité</a>
        </span>

        {/* <div className="flex-grow flex justify-center">
          <a href="/" >
            <img src={logo} alt="logo" className="w-50 h-50 -mt-5" />
          </a>
        </div> */}

        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pr-7 pb-2">Mentions légales</a>
        </span>

        <span className="flex">
          <a href="/" className="text-greenroots_white text-xs pr-2 pb-2">Contact</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
