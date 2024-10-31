import { useState, useEffect } from 'react';
import FilterSelect from '../components/FilterSelect';
import TreesList from '../components/TreesList';

function Trees() {
  interface Tree {
    id: number;
    name: string;
    price: number;
    age: number;
    species: string;
    location: string;
  }
  
  const [filteredTrees, setFilteredTrees] = useState<Tree[]>([]);

  const trees = [
    { id: 1, name: 'Chêne', price: 50, age: 5, species: 'Chêne', location: 'France, Forêt du Pinsan' },
    { id: 2, name: 'Sapin', price: 40, age: 3, species: 'Sapin', location: 'France, Forêt du Pinsan' },
    { id: 3, name: 'Érable', price: 45, age: 4, species: 'Érable', location: 'Canada, Maple Forest' },
    { id: 4, name: 'Bouleau', price: 35, age: 2, species: 'Bouleau', location: 'Canada, Birch Woods' },
  ];

  useEffect(() => {
    setFilteredTrees(trees);
  }, []);

  const handleFilterChange = (species: string) => {
    const filtered = species ? trees.filter(tree => tree.species === species) : trees;
    setFilteredTrees(filtered);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-h2 mt-10 mb-4 text-center">
        Trouve l'arbre qu'il<span className="bg-greenroots_green text-greenroots_white rounded p-1 mx-1">te faut</span>
      </h2>
      <FilterSelect onFilterChange={handleFilterChange} filterType="species" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto p-4">
        {filteredTrees.map(tree => (
          <TreesList key={tree.id} tree={tree} />
        ))}
      </div>
    </main>
  );
}

export default Trees;