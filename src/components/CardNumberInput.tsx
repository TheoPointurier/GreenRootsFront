interface CardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

function CardNumberInput({ value, onChange }: CardNumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="mb-4">
      <label htmlFor="cardNumber" className="block mb-2">Numéro de carte bancaire</label>
      <input
        id="cardNumber"
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={16}
        className="border p-2 w-full"
        placeholder="1234 5678 9012 3456"
      />
    </div>
  );
}

export default CardNumberInput;
