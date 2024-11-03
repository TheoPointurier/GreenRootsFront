import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { fetchCampaigns } from '../api/campaigns';
import TreesList from '../components/TreesList';

interface Tree {
  id: number;
  name: string;
  price_ht: number;
  age: number;
  location: string;
  campaignCountry?: string;
  species: {
    species_name: string;
    co2_absorption?: number;
    description?: string;
    average_lifespan?: number;
  };
}

function TreeDetail() {
  const { id } = useParams<{ id: string }>();
  const [tree, setTree] = useState<Tree | null>(null);
  const [campaignCountries, setCampaignCountries] = useState<string[]>([]);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const campaigns = await fetchCampaigns();
        const countries = new Set<string>();
        let foundTree: Tree | null = null;

        for (const campaign of campaigns) {
          const treeFound = campaign.treesCampaign.find((tree: Tree) => tree.id.toString() === id);
          if (treeFound) {
            foundTree = treeFound;
            countries.add(campaign.location.country.name);
          }
        }

        if (foundTree) {
          setTree(foundTree);
          setCampaignCountries(Array.from(countries));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'arbre:", error);
      }
    };

    fetchTreeData();
  }, [id]);

  if (!tree) {
    return <p>Chargement des données...</p>;
  }

  return (
    <main className="container mx-auto flex flex-col p-5">
      <div className="flex justify-start mt-5">
        <Link to="/" className="pr-1">
          <FontAwesomeIcon icon={faChevronLeft} className="pr-1 ml-1" /> Retour
        </Link>
      </div>

      <div className="flex flex-row justify-evenly mt-2 p-1 items-center">
        <h2 className="text-h2 items-center text-center mt-10 mb-10">
          Détail d'un{' '}
          <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">
          {tree.species?.species_name || 'Espèce non disponible'}
          </span>
        </h2>
      </div>

      <div className="flex justify-center mb-4">
        <TreesList tree={{ ...tree, campaignCountry: campaignCountries.join(', ') }} hideDescriptionButton={true} />
      </div>

      <div className="flex flex-col p-5 mt-1 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 mt-2 mb-2">
          {tree.species?.species_name}
        </h3>
        <p className="mt-2 mb-2">
          {tree.species?.description}
        </p>
        <p className="mt-2 mb-2">
          Absorption de CO₂ : {tree.species?.co2_absorption} kg/an
        </p>
        <p className="mt-2 mb-2">
          Durée de vie moyenne : {tree.species?.average_lifespan} ans
        </p>
        <p className="mt-2 mb-2">
          Lieu(x) de plantation :{' '}
          {campaignCountries.length > 0
            ? campaignCountries.join(', ')
            : 'Aucun lieu de plantation pour le moment'}
        </p>
      </div>
    </main>
  );
}

export default TreeDetail;
