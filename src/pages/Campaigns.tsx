import { useState, useEffect } from 'react';
import FilterSelect from '../components/FilterSelect';
import CampaignsList from '../components/CampaignsList';

function Campaigns() {

  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  // Simuler les campagnes récupérées par une API
  interface Campaign {
    id: number;
    name: string;
    country: string;
    description: string;
    trees: {
      id: number;
      name: string;
      price: number;
      age: number;
      location: string;
    }[];
  }
  
  const campaigns = [
    {
      id: 1,
      name: 'Campagne A',
      country: 'France',
      description: 'Description pour la campagne A',
      trees: [
        { id: 1, name: 'Chêne', price: 50, age: 5, location: 'France, Forêt du Pinsan' },
        { id: 2, name: 'Sapin', price: 40, age: 3, location: 'France, Forêt du Pinsan' },
      ],
    },
    {
      id: 2,
      name: 'Campagne B',
      country: 'USA',
      description: 'Description pour la campagne B',
      trees: [
        { id: 3, name: 'Érable', price: 45, age: 4, location: 'USA, Redwood National Park' },
      ],
    },
    {
      id: 3,
      name: 'Campagne C',
      country: 'Canada',
      description: 'Description pour la campagne C',
      trees: [
        { id: 4, name: 'Bouleau', price: 35, age: 2, location: 'Canada, Birch Woods' },
        { id: 5, name: 'Pin', price: 42, age: 3, location: 'Canada, Algonquin Park' },
      ],
    },
    {
      id: 4,
      name: 'Campagne D',
      country: 'France',
      description: 'Description pour la campagne D',
      trees: [
        { id: 6, name: 'Châtaignier', price: 55, age: 4, location: 'France, Vosges' },
      ],
    },
    {
      id: 5,
      name: 'Campagne E',
      country: 'Germany',
      description: 'Description pour la campagne E',
      trees: [
        { id: 7, name: 'Hêtre', price: 47, age: 5, location: 'Germany, Black Forest' },
      ],
    },
  ];

  useEffect(() => {
    setFilteredCampaigns(campaigns);
  }, []);

  const handleFilterChange = (country: string) => {
    const filtered = country ? campaigns.filter(campaign => campaign.country === country) : campaigns;
    setFilteredCampaigns(filtered);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-h2 mt-10 mb-4 text-center">
        Contribue à la campagne de<span className="bg-greenroots_green text-greenroots_white rounded p-1 mx-1">ton choix</span>
      </h2>
      <FilterSelect onFilterChange={handleFilterChange} filterType="country" />
      <CampaignsList campaigns={filteredCampaigns} />
    </main>
  );
}

export default Campaigns;
