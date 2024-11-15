import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import type { TreeProps } from '../@types/trees';
import { toast } from 'react-toastify';

function TreesList({ tree }: TreeProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const isTreeDetailPage = location.pathname.includes(`/trees/${tree.id}`);
  const isCampaignPage = location.pathname.startsWith('/campaigns');
  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(quantity - 1);
  const handleAddToCart = () => {
    addToCart({
      id: `${tree.id}-${tree.campaignId}`,
      treeId: tree.id,
      campaignId: tree.campaignId || 0,
      name: tree.name,
      price: Number.parseFloat(tree.price_ht.toString()),
      quantity,
      image: `/Trees_Images/${tree.id}.webp`,
      campaignName: tree.campaignName || 'Nom de campagne indisponible',
      campaignLocation: tree.campaignCountry || 'Localisation non disponible',
    });
    console.log('Produit ajouté au panier:', tree);
    toast.success(`${tree.name} ajouté au panier avec succès !`);
  };

  return (
    <article className="flex flex-col rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg w-auto max-w-xs h-auto">
      <div className="flex justify-center w-full">
        <Link to={`/trees/${tree.id}`} className="w-full">
          <img
            src={`/Trees_Images/${tree.id}.webp`}
            alt={tree.name || 'Image'}
            className="w-full h-40 rounded-t-[20px] object-cover"
            loading="lazy"
          />
        </Link>
      </div>
      <div className="flex justify-between flex-col items-center mt-2 w-full h-24">
        <Link to={`/trees/${tree.id}`} className="w-full">
          <h3 className="text-h3 font-bold text-center">
            {tree.name || 'Nom non disponible'}
          </h3>
        </Link>
        <p className="flex justify-around text-sm text-gray-500 items-center gap-2">
          {!isTreeDetailPage && (
            <Link
              to={`/trees/${tree.id}`}
              className="bg-greenroots_green text-greenroots_white text-xs px-3 py-1 rounded-full"
            >
              {tree.species?.species_name || 'Espèce non disponible'}
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
        {!isCampaignPage && (
          <>
            <p className="flex justify-around text-sm text-gray-500 items-center gap-2">
              <Link
                to={`/campaigns/${tree.campaignId}`}
                className="bg-greenroots_green text-greenroots_white text-xs px-3 py-1 rounded-full"
              >
                {tree.campaignName || 'Nom de campagne indisponible'}
              </Link>
            </p>
            <p className="p-1">
              Lieu de plantation :{' '}
              {tree.campaignCountry ||
                'Aucun lieu de plantation pour le moment'}
            </p>
          </>
        )}
        <p className="p-1">Âge : {tree.age || 'Non spécifié'} ans</p>
      </div>
      <div className="flex flex-row justify-between items-center p-2 mb-2 gap-2 w-full">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            className="border border-greenroots_green rounded-l-full w-8 p-3"
          >
            -
          </button>
          <span className="border-t border-b border-greenroots_green px-4 p-3">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="border border-greenroots_green rounded-r-full w-8 p-3"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex items-center bg-greenroots_orange text-white p-0.5 rounded-full"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}

export default TreesList;
