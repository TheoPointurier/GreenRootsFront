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
    <article className="flex flex-col rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg w-full max-w-xs h-full">
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
      <div className="flex flex-col items-center mt-2 w-full px-2 flex-grow">
        <Link to={`/trees/${tree.id}`} className="w-full">
          <h3 className="text-h3 font-bold text-center line-clamp-2 h-[56px]">
            {tree.name || 'Nom non disponible'}
          </h3>
        </Link>
        {!isTreeDetailPage && (
          <p className="text-sm text-gray-500 items-center mt-1">
            <Link
              to={`/trees/${tree.id}`}
              className="bg-greenroots_green text-greenroots_white text-xs px-3 py-1 rounded-full hover:bg-greenroots_orange transition-colors duration-300"
            >
              {tree.species?.species_name || 'Espèce non disponible'}
            </Link>
          </p>
        )}
        <p className="text-greenroots_green mt-1">
          {tree.price_ht
            ? `${Number.parseFloat(tree.price_ht.toString()).toFixed(2)} € HT`
            : 'Prix non disponible'}
        </p>
      </div>
      <div className="m-2 w-full px-2 flex-grow">
        {!isCampaignPage && (
          <>
            <p className="text-sm text-gray-500 items-center mt-1 mr-4">
              <Link
                to={`/campaigns/${tree.campaignId}`}
                className="bg-greenroots_green text-greenroots_white text-xs px-3 py-1 rounded-full block text-center mx-auto w-fit hover:bg-greenroots_orange transition-colors duration-300"
                title={tree.campaignName || 'Nom de campagne indisponible'}
              >
                {tree.campaignName || 'Nom de campagne indisponible'}
              </Link>
            </p>
            <p className="p-1 text-center">
              Lieu de plantation :{' '}
              {tree.campaignCountry ||
                'Aucun lieu de plantation pour le moment'}
            </p>
          </>
        )}
        <p className="p-1 text-center">Âge : {tree.age || 'Non spécifié'} ans</p>
      </div>
      <div className="flex flex-col items-center p-2 mb-2 gap-2 w-full">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            className="border border-greenroots_green rounded-l-full w-8 h-8 flex items-center justify-center hover:bg-greenroots_orange hover:text-greenroots_white transition-colors duration-300"
          >
            -
          </button>
          <span className="border-t border-b border-greenroots_green px-4 h-8 flex items-center justify-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="border border-greenroots_green rounded-r-full w-8 h-8 flex items-center justify-center hover:bg-greenroots_orange hover:text-greenroots_white"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="bg-greenroots_orange text-white py-2 px-4 rounded-full text-sm w-full hover:bg-greenroots_green transition-colors duration-300"
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}

export default TreesList;
