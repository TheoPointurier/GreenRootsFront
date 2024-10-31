import { useState } from 'react';

function Trees() {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Ajout de ${quantity} au panier`);
  };

  return (
    <article className="flex flex-col m-4 rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg w-full">
      <div className='flex justify-center w-full'>
        <img
          src="../public/Images/view-of-flower.webp"
          alt="Nom arbre"
          className="w-full h-40 rounded-t-[20px] object-cover"
          loading="lazy"
        />
      </div>
      <div className='flex flex-row justify-between mt-2 p-2 items-center w-full'>
        <h3 className="text-h3 font-bold">Nom arbre</h3>
        <p className="text-greenroots_green">50 €</p>
      </div>
      <div className='m-2 w-full'>
        <p className="p-1">Age : 0 à 2 ans</p>
        <p className="p-1">Lieu : France, Forêt du Pinsan</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center p-2 mb-2 w-full">
        <div className="flex items-center w-auto">
          <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-8 text-sm md:text-base">-</button>
          <span className="border-t border-b border-blue-300 flex items-center justify-center px-4 text-sm md:text-base font-medium">{quantity}</span>
          <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-8 text-sm md:text-base">+</button>
        </div>
        <button type="submit" className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 rounded-full">
          Ajouter au panier
        </button>
      </form>
    </article>
  );
}

export default Trees;
