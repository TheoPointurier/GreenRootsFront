import { useState, useEffect } from 'react';
import FilterSelect from '../components/FilterSelect';
import CampaignsList from '../components/CampaignsList';
import { fetchCampaigns } from '../api/campaigns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import type { Campaign } from '../@types/campaigns';

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

  // Génère les options de filtre pour les pays sans doublons
  const countryOptions: string[] = Array.from(
    new Set(campaigns.map(campaign => campaign.location?.country?.name || ''))
  );

  // Gère le filtrage par pays
  const handleFilterChange = (country: string) => {
    const filtered = country
      ? campaigns.filter(campaign => campaign.location?.country?.name === country)
      : campaigns;
    setFilteredCampaigns(filtered);
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-h2 mt-10 mb-4 text-center">
        Contribues à la campagne de<span className="bg-greenroots_green text-greenroots_white rounded p-1 mx-1">ton choix</span>
      </h2>
      <div className="flex justify-evenly items-center w-full mt-5">
        <Link to="/" className="pr-1">
          <FontAwesomeIcon icon={faChevronLeft} className="pr-1 ml-1" /> Retour
        </Link>
        <FilterSelect onFilterChange={handleFilterChange} filterType="country" filterOptions={['Tous', ...countryOptions]} />
      </div>
      <CampaignsList campaigns={filteredCampaigns} />
    </main>
  );
}

export default Campaigns;
