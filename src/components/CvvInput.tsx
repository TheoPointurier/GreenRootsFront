interface CvvInputProps {
  value: string;
  onChange: (value: string) => void;
}

function CvvInput({ value, onChange }: CvvInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.replace(/\D/g, ''));
  };

  return (
    <div className="mb-4">
      <label htmlFor="cvv" className="block mb-2">Cryptogramme (CVV)</label>
      <input
        id="cvv"
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={3}
        className="border p-2 w-full"
        placeholder="123"
      />
    </div>
  );
}

export default CvvInput;
