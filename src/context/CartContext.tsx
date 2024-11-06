import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
  id: string; // ID unique basé sur arbre et campagne
  treeId: number; // ID de l'arbre seul
  campaignId: number; // ID de la campagne
  name: string;
  price: number;
  quantity: number;
  image: string;
  campaignName: string; // Nom de la campagne
  campaignLocation: string; // Localisation de la campagne
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    console.log("Panier chargé depuis le localStorage :", parsedCart);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      console.log("Panier sauvegardé dans le localStorage :", cartItems);
    } else {
      localStorage.removeItem('cart');
    }
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
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
