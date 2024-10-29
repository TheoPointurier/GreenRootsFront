// NotFound.tst (404)

const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex justify-center items-center flex-col p-20 ">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl">Oops! La page que vous recherchez n'existe pas.</p>
      <a href="/" className="text-3xl m-8 text-blue-500 hover:underline">
        ça sent le sapin
      </a>
    </div>
  );
};

export default NotFound;