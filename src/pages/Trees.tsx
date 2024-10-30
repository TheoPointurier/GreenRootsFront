import Image from '../../public/Images/Hetre2.jpg';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

function Trees() {
  // Quantity state
  const [quantity, setQuantity] = useState(1); 

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Ajout de ${quantity} au panier`);
  };

  return (
    <main className="flex flex-col">
      <div className='flex-1 flex flex-col mb-5'>
        <h2 className="text-h2 flex flex-wrap justify-center items-center mt-10 mb-4">
          Trouves l'arbre qu'il <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">te faut</span>
        </h2>
        <div className='flex flex-row items-center justify-between flex-wrap ml-1 mr-1 mt-5 mb-3'>
          {/* Back link */}
          <a href="/" className='pr-1'><FontAwesomeIcon icon={faChevronLeft} className='pr-1 ml-6 '/> Retour</a>
          {/* Filter button */}
          <button type="submit" className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-9 pr-9 mr-5 rounded-full">
            Filtrer
          </button>
        </div>
        <p className='text-center pt-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum itaque magni reiciendis? Quisquam, quibusdam quasi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:ml-5 lg:mr-5 xl:ml-10 xl:mr-10">
        {/* Premier article */}
        <article className="flex flex-col m-5 rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg">
          <div className='flex justify-center'>
            <img 
              src={Image} 
              alt="Nom arbre" 
              className="w-full h-40 rounded-t-[20px] object-cover"
            />
          </div>
          <div className='flex flex-row justify-between mt-2 p-1 items-center'>
            <h3 className="text-h3 pt-3 pl-3 mb-1">Nom arbre</h3>
            <p className="text-greenroots_green pr-4" >50 €</p>
          </div>
          <div className='m-1'>
            <p className="p-2 m-1">Age : 0 à 2 ans</p>
            <p className="p-2 m-1">Lieu : France, Forêt du Pinsan</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center p-2 mb-2 flex-wrap">
            <div className="flex items-stretch ml-2 h-10 w-auto">
              <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-7 text-sm md:text-base">-</button>
              <span className="border-t border-b border-blue-300 flex items-center justify-center text-sm md:text-base font-medium pr-8 pl-8">{quantity}</span>
              <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-7 text-sm md:text-base">+</button>
            </div>
            <button type="submit" className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-3 pr-3 rounded-full mr-2">
              Ajouter au panier
            </button>
          </form>
        </article>

        {/* Deuxième article */}
        <article className="flex flex-col m-5 rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg">
          <div className='flex justify-center'>
          <img 
              src="../../public/Images/chene.jpg" 
              alt="Nom arbre" 
              className="w-full h-40 rounded-t-[20px] object-cover"
            />
          </div>
          <div className='flex flex-row justify-between mt-2 p-1 items-center'>
            <h3 className="text-h3 pt-3 pl-3 mb-1">Nom arbre</h3>
            <p className="text-greenroots_green pr-4" >50 €</p>
          </div>
          <div className='m-1'>
            <p className="p-2 m-1">Age : 0 à 2 ans</p>
            <p className="p-2 m-1">Lieu : France, Forêt du Pinsan</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center p-2 mb-2">
            <div className="flex items-stretch ml-2 h-10 w-auto">
              <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-7 text-sm md:text-base">-</button>
              <span className="border-t border-b border-blue-300 flex items-center justify-center text-sm md:text-base font-medium pr-8 pl-8">{quantity}</span>
              <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-7 text-sm md:text-base">+</button>
            </div>
            <button type="submit" className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-3 pr-3 rounded-full mr-2">
              Ajouter au panier
            </button>
          </form>
        </article>

        {/* Troisième article */}
        <article className="flex flex-col m-5 rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg">
          <div className='flex justify-center'>
          <img 
              src="../../public/Images/view-of-flower.jpeg" 
              alt="Nom arbre" 
              className="w-full h-40 rounded-t-[20px] object-cover"
            />
          </div>
          <div className='flex flex-row justify-between mt-2 p-1 items-center'>
            <h3 className="text-h3 pt-3 pl-3 mb-1">Nom arbre</h3>
            <p className="text-greenroots_green pr-4" >50 €</p>
          </div>
          <div className='m-1'>
            <p className="p-2 m-1">Age : 0 à 2 ans</p>
            <p className="p-2 m-1">Lieu : France, Forêt du Pinsan</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center p-2 mb-2">
            <div className="flex items-stretch ml-2 h-10 w-auto">
              <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-7 text-sm md:text-base">-</button>
              <span className="border-t border-b border-blue-300 flex items-center justify-center text-sm md:text-base font-medium pr-8 pl-8">{quantity}</span>
              <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-7 text-sm md:text-base">+</button>
            </div>
            <button type="submit" className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-3 pr-3 rounded-full mr-2">
              Ajouter au panier
            </button>
          </form>
        </article>
        
      </div>
    </main>
  );
}

export default Trees;
