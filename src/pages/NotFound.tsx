// NotFound.tsx (404)

const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex bg-greenroots_beige h-auto justify-center items-center flex-col p-20 min-h-screen">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <div className='flex justify-center'>
            <img 
              src="./src/assets/images/404_sapins.webp" 
              alt="Nom arbre" 
              className="w-full h-100 rounded-t-[20px] object-cover"
            />
        </div>
      <p className="mt-4 text-xl">Oops! La page que vous recherchez n'existe pas.</p>
      <a href="/" className="text-3xl m-8 text-blue-500 hover:underline">
        ça sent le sapin
      </a>
    </div>
  );
};

export default NotFound;