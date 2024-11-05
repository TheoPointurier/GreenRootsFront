import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface TreeProps {
  tree: {
    id: number;
    name: string;
    price_ht: number;
    age: number;
    location: string;
    species: {
      species_name: string;
      co2_absorption?: number;
      description?: string;
      average_lifespan?: number;
    };
    campaignCountry?: string;
  };
  hideDescriptionButton?: boolean;
}

function TreesList({ tree, hideDescriptionButton = false }: TreeProps) {
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
      id: tree.id.toString(),
      name: tree.name,
      price: Number.parseFloat(tree.price_ht.toString()),
      quantity,
      image: '/Images/view-of-flower.webp',
    });
    console.log('Produit ajouté au panier:', tree);
  };

  return (
    <article className="flex flex-col rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg w-auto max-w-xs mx-auto h-auto">
      <div className="flex justify-center w-full">
        <img
          src={`/Trees_Images/${tree.id}.webp`}
          alt={tree.name || 'Image'}
          className="w-full h-40 rounded-t-[20px] object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-center mt-2 w-full h-24">
        <h3 className="text-h3 font-bold">{tree.name || 'Nom non disponible'}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          {tree.species?.species_name || 'Espèce non disponible'}
          {!hideDescriptionButton && (
            <Link
              to={`/trees/${tree.id}`}
              className="bg-greenroots_green text-greenroots_white text-xs px-3 py-1 rounded-full"
            >
              Description
            </Link>
          )}
        </p>
        <p className="text-greenroots_green">
          {tree.price_ht
            ? `${Number.parseFloat(tree.price_ht.toString()).toFixed(2)} € HT`
            : 'Prix non disponible'}
        </p>
      </div>
      <div className="m-2 w-full">
        <p className="p-1">
          Lieu de plantation :{' '}
          {tree.campaignCountry || 'Aucun lieu de plantation pour le moment'}
        </p>
        <p className="p-1">Âge : {tree.age || 'Non spécifié'} ans</p>
      </div>
      <div className="flex flex-row justify-between items-center p-2 mb-2 w-full">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            className="border border-blue-300 rounded-l-full w-8"
          >
            -
          </button>
          <span className="border-t border-b border-blue-300 px-4">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="border border-blue-300 rounded-r-full w-8"
          >
            +
          </button>
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
