import { useState } from 'react';

interface ExpiryDateInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ExpiryDateInput({ value, onChange }: ExpiryDateInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/[^0-9]/g, '');
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const isAddingSlash = newValue.length === 4 && !inputValue.includes('/');

    // Valider le mois
    if (newValue.length === 1 && newValue > '1') {
      newValue = `0${newValue}`;
    } else if (newValue.length === 2) {
      const month = Number.parseInt(newValue.slice(0, 2), 10);
      if (month < 1 || month > 12) {
        newValue = '12';
      }
    }

    // Ajouter '/' après 4 chiffres
    if (newValue.length === 4) {
      newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
    }

    // Limiter à 'MM/AA'
    if (newValue.length > 5) {
      newValue = newValue.slice(0, 5);
    }

    setInputValue(newValue);
    onChange(newValue);

    // Ajuster la position du curseur
    setTimeout(() => {
      if (input.selectionStart !== null) {
        if (isAddingSlash) {
          input.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
        } else if (cursorPosition > 2 && inputValue.length > newValue.length) {
          input.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        } else {
          input.setSelectionRange(cursorPosition, cursorPosition);
        }
      }
    }, 0);
  };

  return (
    <div className="mb-4">
      <label htmlFor="expiryDate" className="block mb-2">Date d'expiration (MM/AA)</label>
      <input
        id="expiryDate"
        type="text"
        value={inputValue}
        onChange={handleChange}
        maxLength={5}
        className="border p-2 w-full"
        placeholder="MM/AA"
      />
    </div>
  );
}

export default ExpiryDateInput;
