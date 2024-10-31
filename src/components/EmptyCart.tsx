function EmptyCart() {
  return (
    <div className="text-center text-gray-500 mt-10">
      <p>Parcourez notre sélection d'arbres et de campagnes pour trouver ce qui vous plaît.</p>
      <img
        src="/Images/illustration_arbre.webp"
        alt="Panier vide"
        className="w-40 h-40 mx-auto mt-6"
      />
    </div>
  );
}

export default EmptyCart;
