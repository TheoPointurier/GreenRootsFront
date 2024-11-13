import type { OrderData, OrderLine, OrderLineInput } from '../@types/Order';

interface OrderCardProps {
  order: OrderData;
}

const isOrderLineWithDetails = (line: OrderLine | OrderLineInput): line is OrderLine => {
  return 'tree' in line && 'campaign' in line;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const totalAmount = typeof order.total_amount === 'string'
    ? Number.parseFloat(order.total_amount)
    : order.total_amount;

  return (
    <div className="order-card mb-6 p-4 border rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2">Commande {order.order_number}</h3>
      <p className="mb-2">Statut : {order.status}</p>
      <p className="mb-4">Montant total HT : {totalAmount.toFixed(2)} €</p>

      {order.orderLines.map((line) => {
        const priceHT = typeof line.price_ht_at_order === 'string'
          ? Number.parseFloat(line.price_ht_at_order)
          : line.price_ht_at_order;
        const totalHT = priceHT * line.quantity;
        const totalTTC = totalHT * 1.2;

        if (isOrderLineWithDetails(line)) {
          console.log('Détails de la campagne récupérés :', line.campaign?.location);
          return (
            <div key={line.id} className="order-line mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-semibold mb-1">{line.tree?.name ?? line.tree_name}</h4>
              <p>Campagne : {line.campaign?.name ?? line.campaign_name}</p>
              <p>Lieu : {line.campaign?.location?.name_location ?? 'Lieu non disponible'}, {line.campaign?.location?.country?.name ?? 'Pays non disponible'}</p>
              <p>Prix HT : {priceHT.toFixed(2)} € / Prix TTC : {(priceHT * 1.2).toFixed(2)} €</p>
              <p>Quantité : {line.quantity}</p>
              <p>Total HT : {totalHT.toFixed(2)} €</p>
              <p>Total TTC : {totalTTC.toFixed(2)} €</p>
            </div>
          );
        }

        // Cas où la ligne est de type `OrderLineInput` (données limitées)
        return (
          <div key={`${line.id_campaign}-${line.id_tree}`} className="order-line mb-4 p-4 bg-gray-50 rounded-lg">
            <p>Détails limités pour cet article (données manquantes).</p>
            <p>Quantité : {line.quantity}</p>
            <p>Total HT : {totalHT.toFixed(2)} €</p>
            <p>Total TTC : {totalTTC.toFixed(2)} €</p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
