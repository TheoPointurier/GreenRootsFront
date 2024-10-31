// components/FilterSelect.tsx
import { useState, useEffect } from 'react';

interface FilterSelectProps {
  onFilterChange: (filter: string) => void;
  filterType: 'country' | 'species'; // Spécifie si l’on filtre par pays ou par espèce d’arbre
}

function FilterSelect({ onFilterChange, filterType }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  useEffect(() => {
    // Simuler la récupération des données selon le type de filtre
    const fetchOptions = async () => {
      if (filterType === 'country') {
        setFilterOptions(['Tous', 'France', 'USA', 'Canada', 'Germany']);
      } else if (filterType === 'species') {
        setFilterOptions(['Toutes', 'Chêne', 'Sapin', 'Érable', 'Bouleau']);
      }
    };
    fetchOptions();
  }, [filterType]);

  const handleFilterSelect = (option: string) => {
    setIsOpen(false);
    onFilterChange(option === 'Tous' || option === 'Toutes' ? '' : option); // Affiche tout si "Tous" ou "Toutes" est sélectionné
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        type="button"
        className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-9 pr-9 mr-5 rounded-full"
      >
        Filtrer par {filterType === 'country' ? 'pays' : 'espèce'}
      </button>
      {isOpen && (
        <ul className="absolute bg-white border mt-2 rounded-lg shadow-lg z-10">
          {filterOptions.map((option) => (
            <button 
              key={option} 
              onClick={() => handleFilterSelect(option)} 
              className="w-full text-left p-2 cursor-pointer hover:bg-gray-100"
              type="button"
            >
              {option}
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilterSelect;
