import { useState } from 'react';

interface FilterCountryProps {
  onFilterChange: (country: string) => void;
}

function FilterCountry({ onFilterChange }: FilterCountryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const countries = ['Tous', 'France', 'USA', 'Canada'];

  const handleCountrySelect = (country: string) => {
    setIsOpen(false);
    onFilterChange(country === 'Tous' ? '' : country); // Si "Tous" est sélectionné, on passe une chaîne vide pour afficher tout
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        type="button"
        className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-9 pr-9 mr-5 rounded-full"
      >
        Filtrer par pays
      </button>
      {isOpen && (
        <ul className="absolute bg-white border mt-2 rounded-lg shadow-lg z-10">
          {countries.map((country) => (
            <button 
              key={country} 
              onClick={() => handleCountrySelect(country)} 
              className="w-full text-left p-2 cursor-pointer hover:bg-gray-100"
              type="button" // Add the explicit type prop
            >
              {country}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterCountry;
