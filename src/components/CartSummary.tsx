interface CartSummaryProps {
  subtotal: number; // Sous-total HT
  onCheckout: () => void;
}

function CartSummary({ subtotal, onCheckout }: CartSummaryProps) {
  const tvaRate = 0.20;
  const subtotalTTC = subtotal * (1 + tvaRate);

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Résumé du panier</h2>
      
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
        className="w-full mt-4 bg-greenroots_green text-white py-2 rounded-lg font-semibold"
      >
        Passer à la caisse
      </button>
    </div>
  );
}

export default CartSummary;
