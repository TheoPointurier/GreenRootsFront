interface PaymentButtonProps {
  onClick: () => void;
}

function PaymentButton({ onClick }: PaymentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-green-500 text-white p-2 rounded-lg w-full"
    >
      Valider et payer
    </button>
  );
}

export default PaymentButton;
