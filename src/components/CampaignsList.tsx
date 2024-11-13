import { useState } from 'react';
import { Link } from 'react-router-dom';
import TreesList from '../components/TreesList';
import type { CampaignsListProps } from '../@types/campaigns';

function CampaignsList({ campaigns }: CampaignsListProps) {
  const [contributionStates, setContributionStates] = useState<boolean[]>(
    new Array(campaigns.length).fill(false),
  );

  const toggleContribution = (index: number) => {
    setContributionStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // Rendu du composant
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-xl mx-auto p-4">
      {campaigns.length === 0 ? (
        <p className="text-center">Aucune campagne trouvée.</p>
      ) : (
        campaigns.map((campaign, idx) => (
          <article
            key={campaign.id}
            className="flex flex-col rounded-lg border shadow-lg max-w-full h-full"
          >
            <div className="flex justify-center w-full">
              <Link to={`/campaigns/${campaign.id}`} className="w-full">
                <img
                  src={`/Campaign_Images/${campaign.id}.webp`}
                  alt={campaign.name}
                  className="w-full h-40 rounded-t-lg object-cover"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="flex flex-col flex-grow p-4">
              <Link to={`/campaigns/${campaign.id}`} className="w-full">
                <h3 className="text-h3 font-bold">{campaign.name}</h3>
              </Link>
              <p className="text-sm text-gray-500 mb-2">
                {campaign.location.name_location},{' '}
                {campaign.location.country.name}
              </p>
              <p className="flex-grow mb-2">{campaign.description}</p>
            </div>
            <div className="flex flex-row justify-between items-center p-2 mb-2">
              <Link
                to={`/campaigns/${campaign.id}`}
                className="bg-greenroots_green text-white p-2 rounded-full"
              >
                En savoir plus
              </Link>
              <button
                type="button"
                onClick={() => toggleContribution(idx)}
                className="flex items-center bg-greenroots_orange text-white p-2 rounded-full"
              >
                <span>Contribuer</span>
                <span className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 transform ${contributionStates[idx] ? 'rotate-180' : ''}`}
                  >
                    <title>Flèche déroulante</title>
                    <path
                      fillRule="evenodd"
                      d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.465l5.879-5.879a1 1 0 111.414 1.414L12 15.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {contributionStates[idx] && campaign.treesCampaign && (
              <div className="p-4 bg-gray-100 rounded-b-lg">
                {campaign.treesCampaign.map((tree) => (
                  <TreesList
                    key={`${tree.id}-${campaign.id}`} // Utilisez une clé unique pour chaque combinaison arbre-campagne
                    tree={{
                      ...tree,
                      campaignCountry: campaign.location.country.name,
                      campaignName: campaign.name,
                      campaignId: campaign.id, // Passez `campaignId` ici
                    }}
                  />
                ))}
              </div>
            )}
          </article>
        ))
      )}
    </div>
  );
}

export default CampaignsList;
