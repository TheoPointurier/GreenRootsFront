import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import FilterCountry from './FilterCountry';
import Trees from './Trees';

// Fonction simulant un appel à l'API pour récupérer des campagnes par pays
const fetchCampaignsByCountry = async (country?: string) => {
  // Simuler une base de données en dur
  const campaigns = [
    { id: 1, name: 'Campagne A', country: 'France', description: 'Description pour la campagne A' },
    { id: 2, name: 'Campagne B', country: 'USA', description: 'Description pour la campagne B' },
    { id: 3, name: 'Campagne C', country: 'Canada', description: 'Description pour la campagne C' },
    { id: 4, name: 'Campagne D', country: 'France', description: 'Description pour la campagne D' },
  ];

  // Retourner toutes les campagnes si aucun pays n'est spécifié
  if (!country) return campaigns;

  // Sinon, filtrer les campagnes par le pays sélectionné
  return campaigns.filter(campaign => campaign.country === country);
};

function CampaignsList() {
  const [contributionStates, setContributionStates] = useState<boolean[]>([]);
  interface Campaign {
    id: number;
    name: string;
    country: string;
    description: string;
  }
  
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  // Charger toutes les campagnes au chargement de la page
  useEffect(() => {
    const loadCampaigns = async () => {
      const campaigns = await fetchCampaignsByCountry(); // Récupère toutes les campagnes
      setFilteredCampaigns(campaigns);
      setContributionStates(new Array(campaigns.length).fill(false)); // Initialise les états de contribution
    };

    loadCampaigns();
  }, []);

  const handleFilterChange = async (country: string) => {
    const campaigns = await fetchCampaignsByCountry(country);
    setFilteredCampaigns(campaigns);
    setContributionStates(new Array(campaigns.length).fill(false)); // Réinitialise les états de contribution
  };  

  const toggleContribution = (index: number) => {
    setContributionStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <main className="flex flex-col items-center">
      <h2 className="text-h2 flex justify-center items-center mt-10 mb-4 text-center">
        Contribue à la campagne de<span className="bg-greenroots_green text-greenroots_white rounded p-1 mx-1">ton choix</span>
      </h2>
      <div className='flex flex-row items-center justify-between w-full px-4'>
        <a href="/" className='pr-1'><FontAwesomeIcon icon={faChevronLeft} className='pr-1'/> Retour</a>
        <FilterCountry onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-screen-xl mx-auto p-4">
        {filteredCampaigns.map((campaign, idx) => (
          <article key={campaign.id} className="flex flex-col rounded-t-[20px] rounded-b-[10px] border border-grey shadow-lg max-w-full">
            <div className='flex justify-center w-full'>
              <img 
                src="../../public/Images/Hetre2.jpg" 
                alt={campaign.name} 
                className="w-full h-40 rounded-t-[20px] object-cover"
                loading="lazy"
              />
            </div>
            <div className='flex flex-col p-4'>
              <h3 className="text-h3 font-bold">{campaign.name}</h3>
              <h3 className="text-h3">{campaign.country}</h3> {/* Ajout du pays sous le nom */}
              <p className="p-2">{campaign.description}</p>
            </div> 
            <form className="flex flex-row justify-between items-center p-2 mb-2">
              <button type="button" className="bg-greenroots_green text-greenroots_white text-[0.8rem] p-2 rounded-full">
                En savoir plus
              </button>
              <button
                type="button"
                onClick={() => toggleContribution(idx)}
                className="bg-greenroots_orange text-greenroots_white text-[0.8rem] p-2 rounded-full"
              >
                <div className="flex items-center justify-between">
                  <span>Je contribue</span>
                  <span className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={`w-5 h-5 transform ${contributionStates[idx] ? 'rotate-180' : ''}`}
                      aria-labelledby="contribution-icon"
                    >
                      <title id="contribution-icon">Flèche déroulante</title>
                      <path
                        fillRule="evenodd"
                        d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.465l5.879-5.879a1 1 0 111.414 1.414L12 15.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            </form>
            {contributionStates[idx] && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="flex flex-col items-center gap-4 w-full">
                  {[...Array(2)].map((_, idx) => (
                    <Trees key={`arbre-${Date.now()}-${idx}`} />
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}

export default CampaignsList;
