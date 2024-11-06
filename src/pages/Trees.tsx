import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FilterSelect from '../components/FilterSelect';
import TreesList from '../components/TreesList';
import { fetchTrees } from '../api/trees';
import { fetchCampaigns } from '../api/campaigns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface Tree {
  id: number;
  name: string;
  price: number;
  price_ht: number;
  age: number;
  species: {
    species_name: string;
  };
  location: string;
  campaignCountry?: string;
}

function Trees() {
  const [filteredTrees, setFilteredTrees] = useState<Tree[]>([]);
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [treeData, campaignData] = await Promise.all([
          fetchTrees(),
          fetchCampaigns(),
        ]);

        const enrichedTrees = treeData.map((tree: Tree) => {
          const relatedCampaign = campaignData.find((campaign: { treesCampaign: { id: number }[]; location?: { country?: { name: string } } }) =>
            campaign.treesCampaign.some(campaignTree => campaignTree.id === tree.id)
          );
          
          return {
            ...tree,
            campaignCountry: relatedCampaign?.location?.country?.name || 'Aucun lieu de plantation pour le moment',
          };
        });

        setTrees(enrichedTrees);
        setFilteredTrees(enrichedTrees);
      } catch (error) {
        console.error("Erreur lors de la récupération des arbres et campagnes :", error);
      }
    };
    
    fetchData();
  }, []);

  const speciesOptions = Array.from(new Set(trees.map(tree => tree.species?.species_name || '')));

  const handleFilterChange = (speciesName: string) => {
    const filtered = speciesName
      ? trees.filter(tree => tree.species?.species_name === speciesName)
      : trees;
    setFilteredTrees(filtered);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-h2 mt-10 mb-4 text-center">
        Trouve l'arbre qu'il<span className="bg-greenroots_green text-greenroots_white rounded p-1 mx-1">te faut</span>
      </h2>
      <div className="flex justify-evenly items-center w-full mt-5">
        <Link to="/" className="pr-1">
          <FontAwesomeIcon icon={faChevronLeft} className="pr-1 ml-1" /> Retour
        </Link>
        <FilterSelect onFilterChange={handleFilterChange} filterType="species" filterOptions={['Toutes', ...speciesOptions]} />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto p-4">
        {filteredTrees.map(tree => (
          <TreesList key={tree.id} tree={tree} />
        ))}
      </div>
    </main>
  );
}

export default Trees;
