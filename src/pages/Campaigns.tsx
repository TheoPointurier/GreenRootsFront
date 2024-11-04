import { useState, useEffect } from 'react';
import FilterSelect from '../components/FilterSelect';
import CampaignsList from '../components/CampaignsList';
import { fetchCampaigns } from '../api/campaigns';

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

function Campaigns() {
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des campagnes :", error);
      }
    };

    getCampaigns();
  }, []);

  const countryOptions = Array.from(new Set(campaigns.map(campaign => campaign.location?.country?.name || '')));

  const handleFilterChange = (country: string) => {
    const filtered = country
      ? campaigns.filter(campaign => campaign.location?.country?.name === country)
      : campaigns;
    setFilteredCampaigns(filtered);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-h2 mt-10 mb-4 text-center">
        Contribue à la campagne de<span className="bg-greenroots_green text-greenroots_white rounded p-1 mx-1">ton choix</span>
      </h2>
      <FilterSelect onFilterChange={handleFilterChange} filterType="country" filterOptions={['Tous', ...countryOptions]} />
      <CampaignsList campaigns={filteredCampaigns} />
    </main>
  );
}

export default Campaigns;
