import Image from '../../public/Images/Hetre2.jpg';
import { useState } from 'react'; // Importer useState

function Trees() {
  // Quantity state
  const [quantity, setQuantity] = useState(1); 

  const handleIncrement = () => {
    // Increment the quantity
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      // Decrement the quantity
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent page reloading
    event.preventDefault();
    // Logic to add to cart
    console.log(`Ajout de ${quantity} au panier`);
  };

  return (
    <main className="flex flex-col">
      <h2 className="text-h2 flex flex-wrap justify-center items-center mt-10 mb-4">
        Trouves l'arbre qu'il <span className="bg-greenroots_green text-greenroots_white rounded p-1">te faut</span>
      </h2>
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
          <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center p-2 mb-2"> {/* Encapsuler le tout dans un formulaire */}
            <div className="flex items-stretch ml-2 h-10 w-auto">
              <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-7 text-sm md:text-base">-</button>
              <span className="border-t border-b border-blue-300 flex items-center justify-center text-sm md:text-base font-medium pr-6 pl-6">{quantity}</span>
              <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-7 text-sm md:text-base">+</button>
            </div>
            <button type="submit" className="bg-greenroots_orange p-2 rounded-lg mr-2">
              Ajouter au panier
            </button>
          </form>
        </article>
      </div>
    </main>
  );
}

export default Trees;
