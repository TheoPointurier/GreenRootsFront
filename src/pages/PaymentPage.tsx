import { useState } from 'react';
import CardNumberInput from '../components/CardNumberInput';
import ExpiryDateInput from '../components/ExpiryDateInput';
import CvvInput from '../components/CvvInput';
import PaymentButton from '../components/PaymentButton';

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const validateExpiryDate = () => {
    const [month, year] = expiryDate.split('/').map(Number);
    if (!month || !year || month < 1 || month > 12) {
      return "Date d'expiration invalide. Utilisez le format MM/AA.";
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "La date d'expiration est déjà passée.";
    }

    return '';
  };

  const handlePayment = () => {
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

    alert('Paiement réussi ! Merci pour votre achat.');
    setError('');
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
