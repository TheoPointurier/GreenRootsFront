import { Link } from 'react-router-dom';
import ERROR404 from '../assets/images/404_sapins.webp';

const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex bg-greenroots_beige h-auto justify-center items-center flex-col md:p-20 min-h-screen">
      <section className="flex flex-col justify-between p-5 mb-5 rounded-[20px] border border-grey shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        
        {/* Title 404 */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-red-500 p-3">404</h1>
        
        {/* Image */}
        <div className='flex justify-center mt-4'>
          <img 
            src={ERROR404} 
            alt="page not found" 
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-[20px]"
          />
        </div>

        {/* Back link */}
        <Link to="/" className="text-center text-xl md:text-3xl mt-8 text-blue-500 hover:underline">
          Oups, ça sent le sapin !
        </Link>

        {/* Error message */}
        <p className="mt-4 text-lg md:text-xl text-center">
          La page que vous recherchez n'existe pas, vous pouvez revenir à <Link to="/" className="text-blue-500 hover:underline">
            l'accueil
          </Link>.
        </p>
      </section>
    </div>
  );
};

export default NotFound;
