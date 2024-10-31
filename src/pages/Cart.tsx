import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';

function Cart() {
  const { cartItems } = useCart();
  console.log("Contenu du panier lors du rendu dans Cart :", cartItems);

  const subtotalHT = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Oh! mais qu'elle beau <span className="bg-greenroots_green text-white rounded-lg px-4">panier</span>
      </h1>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              quantity={item.quantity}
            />
          ))}
          <CartSummary subtotal={subtotalHT} onCheckout={() => console.log('Checkout')} />
        </div>
      )}
    </div>
  );
}

export default Cart;
