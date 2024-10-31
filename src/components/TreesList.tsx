import { useState } from 'react';

interface TreeProps {
  tree: {
    id: number;
    name: string;
    price: number;
    age: number;
    location: string;
  };
}

function TreesList({ tree }: TreeProps) {
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
    <article className="flex flex-col rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg w-full max-w-xs mx-auto h-full">
      <div className="flex justify-center w-full">
        <img
          src="../../public/Images/view-of-flower.webp"
          alt={tree.name}
          className="w-full h-40 rounded-t-[20px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center mt-2 w-full h-24">
        <h3 className="text-h3 font-bold">{tree.name}</h3>
        <p className="text-greenroots_green">{tree.price} €</p>
      </div>
      <div className="m-2 w-full flex-grow">
        <p className="p-1">Âge : {tree.age} ans</p>
        <p className="p-1">Lieu : {tree.location}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-row justify-between items-center p-2 mb-2 w-full flex-nowrap">
        <div className="flex items-center">
          <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-8 text-sm md:text-base">-</button>
          <span className="border-t border-b border-blue-300 flex items-center justify-center px-4 text-sm md:text-base font-medium">{quantity}</span>
          <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-8 text-sm md:text-base">+</button>
        </div>
        <button
          type="submit"
          className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 rounded-full"
        >
          Ajouter au panier
        </button>
      </form>
    </article>
  );
}

export default TreesList;
