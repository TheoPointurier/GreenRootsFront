export interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    campaignName: string;
    campaignLocation: string;
    countryName: string; // Ajout de countryName
  };
  quantity: number;
}

export interface CartItem {
  id: string;
  treeId: number;
  campaignId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  campaignName: string;
  campaignLocation: string;
  countryName?: string; // Rendre `countryName` optionnel
}

export interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

export interface CartSummaryProps {
  subtotal: number; // Sous-total HT
  onCheckout: () => void;
}