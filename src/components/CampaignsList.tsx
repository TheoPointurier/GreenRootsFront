import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCampaigns } from '../api/campaigns';
import TreesList from '../components/TreesList';

interface Campaign {
  id: number;
  name: string;
  description: string;
  location: {
    name_location: string;
    country: {
      name: string;
    };
  };
  treesCampaign: {
    id: number;
    name: string;
    price_ht: number;
    age: number;
    location: string;
    species: {
      species_name: string;
    };
  }[];
}

function CampaignsList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [contributionStates, setContributionStates] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
        setContributionStates(new Array(data.length).fill(false));
      } catch (error) {
        console.error("Erreur lors de la récupération des campagnes:", error);
      }
    };

    fetchData();
  }, []);

  const toggleContribution = (index: number) => {
    setContributionStates(prevStates =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-xl mx-auto p-4">
      {campaigns.map((campaign, idx) => (
        <article key={campaign.id} className="flex flex-col rounded-t-lg border shadow-lg max-w-full">
          <div className="flex justify-center w-full">
            <img
              src={`/Campaign_Images/${campaign.id}.webp`}
              alt={campaign.name}
              className="w-full h-40 rounded-t-lg object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col p-4">
            <h3 className="text-h3 font-bold">{campaign.name}</h3>
            <p className="text-sm text-gray-500">
              {campaign.location.name_location}, {campaign.location.country.name}
            </p>
            <p className="p-2">{campaign.description}</p>
          </div>
          <div className="flex flex-row justify-between items-center p-2 mb-2">
            <Link to={`/campaigns/${campaign.id}`} className="bg-greenroots_green text-white p-2 rounded-full">
              En savoir plus
            </Link>
            <button
              type="button"
              onClick={() => toggleContribution(idx)}
              className="bg-greenroots_orange text-white p-2 rounded-full"
            >
              Contribuer
            </button>
          </div>
          {contributionStates[idx] && campaign.treesCampaign && (
            <div className="p-4 bg-gray-100 rounded-lg">
              {campaign.treesCampaign.map(tree => (
                <TreesList key={tree.id} tree={{ ...tree, campaignCountry: campaign.location.country.name }} />
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default CampaignsList;
