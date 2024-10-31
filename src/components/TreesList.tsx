import { useState } from 'react';
import { useCart } from '../context/CartContext';

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
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...tree,
      quantity,
      image: '/Images/view-of-flower.webp',
    });
    console.log("Produit ajouté au panier:", tree);
  };
  

  return (
    <article className="flex flex-col items-center p-4 border rounded-lg shadow-md">
      <div className="flex flex-col items-center mt-2 w-full">
        <h3 className="text-h3 font-bold">{tree.name}</h3>
        <p className="text-greenroots_green">{tree.price.toFixed(2)} € HT</p>
      </div>
      <div className="m-2 w-full">
        <p className="p-1">Âge : {tree.age} ans</p>
        <p className="p-1">Lieu : {tree.location}</p>
      </div>
      <div className="flex flex-row justify-between items-center p-2 mb-2 w-full">
        <div className="flex items-center">
          <button type="button" onClick={handleDecrement} className="border border-blue-300 rounded-l-full w-8">-</button>
          <span className="border-t border-b border-blue-300 px-4">{quantity}</span>
          <button type="button" onClick={handleIncrement} className="border border-blue-300 rounded-r-full w-8">+</button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-greenroots_orange text-greenroots_white p-2 rounded-full"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}

export default TreesList;