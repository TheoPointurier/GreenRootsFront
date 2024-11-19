interface PaymentButtonProps {
  onClick: () => void;
}

function PaymentButton({ onClick }: PaymentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-greenroots_green text-white p-2 rounded-lg w-full hover:bg-greenroots_orange duration-300"
    >
      Valider et payer
    </button>
  );
}

export default PaymentButton;
