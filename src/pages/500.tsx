const ServerError: React.FC = () => {
  return (
    <div className="flex-1 flex bg-greenroots_beige h-auto justify-center items-center flex-col md:p-20 min-h-screen">
      <section className="flex flex-col justify-between p-5 mb-5 rounded-[20px] border border-grey shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
        
        {/* Title 500 */}
        <h1 className="text-4xl md:text-6xl font-bold text-center text-red-500 p-3">500</h1>
        
        {/* Image */}
        <div className='flex justify-center mt-4'>
          <img 
            src="./src/assets/images/404_sapins.webp" 
            alt="Nom arbre" 
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-[20px]"
          />
        </div>

        {/* Back link */}
        <p className="text-center text-xl md:text-3xl mt-8 text-blue-500">
          Oups, ça sent le sapin !
        </p>

        {/* Error message */}
        <p className="mt-4 text-lg md:text-xl text-center">
          Le serveur est actuellement indisponible, revenez plus tard 
        </p>
      </section>
    </div>
  );
};

export default ServerError;
