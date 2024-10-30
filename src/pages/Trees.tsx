import Image from '../../public/Images/Hetre2.jpg';

function Trees () {
  return (
    <main className="flex flex-col">
      <h2 className="text-h2 flex flex-wrap justify-center items-center mt-10 mb-4">Trouves l'arbre qu'il <span className="bg-greenroots_green text-greenroots_white rounded p-1">te faut</span></h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1">
      <article className="flex flex-col m-5 rounded-b-md rounded-t-lg border border-grey rounded-r-lg shadow-lg">
        <div className='flex justify-center'>
          <img src={Image} alt="Nom arbre" className="rounded-t-lg" />
        </div>
        <div>
          <h3 className="text-h3 pt-3 pl-3 mb-2">Nom arbre</h3>
        </div>
        <div>
          <p className="p-2">Prix</p>
          <p className="p-2">Age : 0 à 2 ans</p>
          <p className="p-2">Lieu : France, Forêt du Pinsan</p>
        </div>
        <div className="flex flex-row justify-between items-center p-2 mb-2">
        <div className="flex items-stretch ml-2 h-10 w-auto">
          <button type="submit" className="border border-blue-300 rounded-l-full w-7 text-sm md:text-base">-</button>
          <span className="border-t border-b border-blue-300 flex items-center justify-center text-sm md:text-base font-medium pr-6 pl-6">1</span>
          <button type="submit" className="border border-blue-300 rounded-r-full w-7 text-sm md:text-base">+</button>
        </div>
          <button type="submit" className="bg-greenroots_orange p-2 rounded-lg mr-2">
            Ajouter au panier
          </button>
        </div>
      </article>
      </div>
    </main>
  );
}

export default Trees;