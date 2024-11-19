import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, CartContextProps } from '../@types/Cart';

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    const newItem = {
      ...item,
      countryName: item.countryName ?? 'Pays non disponible',
    };
  
    setCartItems(prevCart => {
      const existingItem = prevCart.find(
        cartItem => cartItem.treeId === newItem.treeId && cartItem.campaignId === newItem.campaignId
      );
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.treeId === newItem.treeId && cartItem.campaignId === newItem.campaignId
            ? { ...cartItem, quantity: cartItem.quantity + newItem.quantity, countryName: newItem.countryName }
            : cartItem
        );
      }
      return [...prevCart, newItem];
    });
  };  

  const increaseQuantity = (itemId: string) => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
};
