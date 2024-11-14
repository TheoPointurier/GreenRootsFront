import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/order';
import CardNumberInput from '../components/CardNumberInput';
import ExpiryDateInput from '../components/ExpiryDateInput';
import CvvInput from '../components/CvvInput';
import PaymentButton from '../components/PaymentButton';
import type { OrderData, OrderLineInput } from '../@types/Order';
import { showSuccessToast, showErrorToast } from '../components/ToastProvider';

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // Calcul du montant total
  const totalAmount = Number.parseFloat(
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  );
  console.log('Montant total calculé =', totalAmount);

  const orderNumber = `ORD-${Date.now()}`;
  console.log('Numéro de commande généré =', orderNumber);

  // Création des lignes de commande
  const orderLines = cartItems.map((item) => {
    const line = {
      price_ht_at_order: item.price,
      quantity: item.quantity,
      total_amount: Number.parseFloat((item.price * item.quantity).toFixed(2)),
      id_campaign: item.campaignId,
      id_tree: item.treeId,
      tree_name: item.name,
      tree_image: item.image,
      campaign_name: item.campaignName,
      campaign_location: item.campaignLocation,
      country_name: item.countryName ?? 'Pays non disponible',
    };
  
    // Forcer la valeur par défaut si `country_name` est vide
    if (!line.country_name) {
      line.country_name = 'Pays non disponible';
    }
  
    console.log('Vérification de la ligne de commande avant l\'envoi:', JSON.stringify(line, null, 2));
    return line;
  });
  

  console.log('Toutes les lignes de commande =', orderLines);

  const validateExpiryDate = () => {
    const [month, year] = expiryDate.split('/').map(Number);
    console.log('Mois et année extraits:', { month, year });

    if (!month || !year || month < 1 || month > 12) {
      return "Date d'expiration invalide. Utilisez le format MM/AA.";
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    console.log('Date actuelle :', { currentMonth, currentYear });

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "La date d'expiration est déjà passée.";
    }

    return '';
  };

  const handlePayment = async () => {
    if (cardNumber.length !== 16) {
      setError('Numéro de carte invalide. Il doit contenir 16 chiffres.');
      return;
    }

    const expiryError = validateExpiryDate();
    if (expiryError) {
      setError(expiryError);
      return;
    }

    if (cvv.length !== 3) {
      setError('CVV invalide. Il doit contenir 3 chiffres.');
      return;
    }

    // Préparation des données de la commande
    const orderData: OrderData = {
      total_amount: Number(totalAmount),
      status: 'En cours',
      order_number: orderNumber,
      orderLines: orderLines.map<OrderLineInput>((line) => ({
        price_ht_at_order: line.price_ht_at_order,
        quantity: line.quantity,
        total_amount: line.total_amount,
        id_campaign: line.id_campaign,
        id_tree: line.id_tree,
      })),
    };
    
    console.log('Données envoyées (corrigées) :', JSON.stringify(orderData, null, 2));

    try {
      const response = await createOrder(orderData);

      if (response?.createdOrder) {
        console.log('Réponse de la création de commande :', response);
        showSuccessToast('Paiement réussi ! Votre commande a été enregistrée.');
        clearCart();
        navigate('/user/orders');
      } else {
        showErrorToast("Une erreur est survenue lors de l'enregistrement de votre commande.");
      }
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
      showErrorToast('Erreur de connexion au serveur. Veuillez réessayer.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Page de Paiement</h2>

      <CardNumberInput value={cardNumber} onChange={setCardNumber} />
      <ExpiryDateInput value={expiryDate} onChange={setExpiryDate} />
      <CvvInput value={cvv} onChange={setCvv} />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <PaymentButton onClick={handlePayment} />
    </div>
  );
}

export default PaymentPage;
