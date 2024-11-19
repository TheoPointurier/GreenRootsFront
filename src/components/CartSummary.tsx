import type { CartSummaryProps } from "../@types/Cart";

function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  const tvaRate = 0.20;
  const subtotalTTC = subtotal * (1 + tvaRate);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full max-w-lg lg:w-full lg:max-w-4xl mb-20">
      <h2 className="text-xl font-semibold mb-4 text-center">Résumé du panier</h2>
  
      <div className="flex justify-between py-2">
        <span>Sous-total HT</span>
        <span>{subtotal.toFixed(2)} €</span>
      </div>
  
      <div className="flex justify-between py-2">
        <span>Total TTC</span>
        <span>{subtotalTTC.toFixed(2)} €</span>
      </div>
  
      <button
        type="button"
        onClick={onCheckout}
        className="w-full mt-4 bg-greenroots_green text-white py-2 rounded-lg font-semibold hover:bg-greenroots_orange duration-300"
      >
        Passer au règlement
      </button>
    </div>
  );
  
}

export default CartSummary;
