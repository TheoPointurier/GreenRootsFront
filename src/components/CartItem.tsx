import { useCart } from '../context/CartContext';
import type { CartItemProps  } from '../@types/Cart';
/*interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    campaignName: string;
    campaignLocation: string;
  };
  quantity: number;
}*/

function CartItem({ item, quantity }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const tvaRate = 0.20;
  const priceHT = typeof item.price === 'string' ? Number.parseFloat(item.price) : item.price;
  const priceTTC = priceHT * (1 + tvaRate);

  return (
    <div className="flex items-center border-b py-4">
      <div className="w-24 h-24 mr-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-500">Campagne : {item.campaignName}</p>
        <p className="text-gray-500">Lieu : {item.campaignLocation}</p>
        <p className="text-greenroots_green">
          {priceHT.toFixed(2)} € HT / {priceTTC.toFixed(2)} € TTC
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => decreaseQuantity(item.id)}
          className="border border-blue-300 rounded-full w-8 h-8 text-center"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="px-4 text-sm md:text-base font-medium">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => increaseQuantity(item.id)}
          className="border border-blue-300 rounded-full w-8 h-8 text-center"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 ml-4"
          type="button"
        >
          Supprimer
        </button>
      </div>

      <div className="ml-4">
        <p className="text-lg font-semibold">
          {(priceTTC * quantity).toFixed(2)} € TTC
        </p>
      </div>
    </div>
  );
}

export default CartItem;
