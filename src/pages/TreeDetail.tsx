import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { fetchCampaigns } from '../api/campaigns';
import TreesList from '../components/TreesList';
import type { Campaign } from '../@types/campaigns';
import type { TreeProps } from '../@types/trees';

function TreeDetail() {
  const { id } = useParams<{ id: string }>();
  const [tree, setTree] = useState<TreeProps['tree'] | null>(null);
  const [treeCampaigns, setTreeCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const campaigns = await fetchCampaigns();
        const relatedCampaigns = campaigns.filter((campaign: Campaign) =>
          campaign.treesCampaign.some(
            (treeInCampaign) => treeInCampaign.id.toString() === id,
          ),
        );

        if (relatedCampaigns.length > 0) {
          const foundTree =
            relatedCampaigns[0].treesCampaign.find(
              (t: TreeProps['tree']) => t.id.toString() === id,
            ) || null;
          if (foundTree) {
            setTree({
              ...foundTree,
              campaignCountry: relatedCampaigns[0].location.country.name,
              campaignName: relatedCampaigns[0].name,
              campaignId: relatedCampaigns[0].id,
            });
          }
          setTreeCampaigns(relatedCampaigns);
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
        <Link to="/trees" className="pr-1">
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

      <div className="flex flex-col p-5 mt-1 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 mt-2 mb-2">{tree.species?.species_name}</h3>
        <p className="mt-2 mb-2">{tree.species?.description}</p>
        <p className="mt-2 mb-2">
          Absorption de CO₂ : {tree.species?.co2_absorption} kg/an
        </p>
        <p className="mt-2 mb-2">
          Durée de vie moyenne : {tree.species?.average_lifespan} ans
        </p>
        <p className="mt-2 mb-2">
          Lieu(x) de plantation :{' '}
          {treeCampaigns.length > 0
            ? treeCampaigns
                .map((campaign) => campaign.location.country.name)
                .join(', ')
            : 'Aucun lieu de plantation pour le moment'}
        </p>
      </div>
      <div className="flex flex-row justify-evenly mt-2 p-1 items-center">
        <h2 className="text-h2 items-center text-center mt-10 mb-10">
          <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">
            {tree.species?.species_name || 'Espèce non disponible'}
          </span>
          {' '}dans une campagne
        </h2>
      </div>
      {/* Affiche une instance de TreesList par campagne */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {treeCampaigns.map((campaign) => (
          <TreesList
            key={`${tree.id}-${campaign.id}`}
            tree={{
              ...tree,
              campaignCountry: campaign.location.country.name,
              campaignName: campaign.name,
              campaignId: campaign.id,
            }}
          />
        ))}
      </div>
    </main>
  );
}

export default TreeDetail;
