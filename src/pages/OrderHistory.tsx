import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useUser } from '../context/UserContext';
import { showErrorToast } from '../components/ToastProvider';
import OrderCard from '../components/OrderCard';
import type { OrderData } from '../@types/Order';

const OrderHistoryPage = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("Vous devez être connecté pour consulter l'historique des commandes.");
      return;
    }
  
    const fetchOrderHistory = async () => {
      try {
        const response = await apiClient('/orders', {
          method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Données des commandes récupérées :', JSON.stringify(response, null, 2));
        setOrders(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        showErrorToast("Impossible de récupérer l'historique des commandes.");
      }
    };
  
    fetchOrderHistory();
  }, [user]);
  

  if (error) return <p>{error}</p>;
  if (!orders.length) return <p>Aucune commande trouvée.</p>;

  return (
    <main className="order-history p-6">
      <h2 className="text-2xl font-bold mb-6">Historique des commandes</h2>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </main>
  );
};

export default OrderHistoryPage;
