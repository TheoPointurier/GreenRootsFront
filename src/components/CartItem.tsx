import { useCart } from '../context/CartContext';
import type { CartItemProps } from '../@types/Cart';

function CartItem({ item, quantity }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const tvaRate = 0.2;
  const priceHT =
    typeof item.price === 'string' ? Number.parseFloat(item.price) : item.price;
  const priceTTC = priceHT * (1 + tvaRate);

  return (
    <article className="flex flex-col md:flex-row rounded-[20px] border border-gray-300 shadow-lg w-full max-w-lg lg:w-full lg:max-w-4xl mb-6">
  {/* Image */}
  <div className="flex justify-center w-full md:w-1/3">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-40 md:h-full rounded-t-[20px] md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-t-none object-cover"
      loading="lazy"
    />
  </div>

  {/* Informations sur l'article */}
  <div className="flex flex-col items-center md:items-start p-4 w-full md:w-2/3">
    <h3 className="text-lg font-bold mb-2">{item.name}</h3>
    <p className="text-sm text-gray-500 mb-1">Campagne : {item.campaignName}</p>
    <p className="text-sm text-gray-500 mb-1">Lieu : {item.campaignLocation}</p>
    <p className="text-greenroots_green mb-2">
      {priceHT.toFixed(2)} € HT / {priceTTC.toFixed(2)} € TTC
    </p>

    {/* Contrôle de la quantité et bouton supprimer */}
    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
      {/* Contrôles de quantité */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          className="border border-greenroots_green rounded-l-full w-8 p-3 hover:bg-greenroots_orange hover:text-greenroots_white transition-colors duration-300"
        >
          -
        </button>
        <span className="border-t border-b border-greenroots_green px-4 p-3">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          className="border border-greenroots_green rounded-r-full w-8 p-3 hover:bg-greenroots_orange hover:text-greenroots_white transition-colors duration-300"
        >
          +
        </button>
      </div>

      {/* Bouton supprimer */}
      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        className="bg-greenroots_red text-white py-2 px-6 rounded-full md:w-auto w-full mt-2 md:mt-0 hover:bg-greenroots_orange duration-300"
      >
        Supprimer
      </button>
    </div>

    {/* Prix total */}
    <div className="flex justify-center md:justify-end items-center w-full mt-4">
      <p className="text-lg font-semibold">
        {(priceTTC * quantity).toFixed(2)} € TTC
      </p>
    </div>
  </div>
</article>

  );
}

export default CartItem;
