import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';
import AuthModal from '../components/AuthModal';

function Cart() {
  const { cartItems } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const subtotalHT = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (user) {
      navigate('/payment');
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Oh! mais quel beau <span className="bg-greenroots_green text-white rounded-lg px-4">panier</span>
      </h1>
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-6">
          {cartItems.map((item) => (
            <CartItem
            key={item.id}
            item={{
              ...item,
              countryName: item.countryName ?? 'Pays non disponible',
            }}
            quantity={item.quantity}
          />          
          ))}
          <CartSummary subtotal={subtotalHT} onCheckout={handleCheckout} />
        </div>
      )}
      {showModal && <AuthModal onClose={handleCloseModal} />}
    </div>
  );
}

export default Cart;
