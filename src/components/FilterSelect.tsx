import { useState } from 'react';
import type { FilterSelectProps } from '../@types/Filter';

function FilterSelect({ onFilterChange, filterType, filterOptions }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterSelect = (option: string) => {
    setIsOpen(false);
    onFilterChange(option === 'Tous' || option === 'Toutes' ? '' : option);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        type="button"
        className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 pl-9 pr-9 mr-5 rounded-full hover:bg-greenroots_green transition-colors duration-300"
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
