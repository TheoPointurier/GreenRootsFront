import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { fetchCampaignById } from '../api/campaigns';
import TreesList from '../components/TreesList';

interface Tree {
  id: number;
  name: string;
  price_ht: number;
  age: number;
  location: string;
  species: {
    species_name: string;
    co2_absorption?: number;
    description?: string;
    average_lifespan?: number;
  };
}

interface Campaign {
  id: number;
  name: string;
  description: string;
  end_campaign: string;
  location: {
    name_location: string;
    country: {
      name: string;
    };
  };
  treesCampaign: Tree[];
}

function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!id) {
        console.error("ID de campagne manquant");
        return;
      }
      try {
        const data = await fetchCampaignById(id);
        setCampaign(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la campagne:", error);
      }
    };

    fetchCampaignData();
  }, [id]);

  if (!campaign) {
    return <p>Chargement des données...</p>;
  }

  // Convert and format end_campaign date
  // The T is used to separate the date and time in a string that follows the ISO 8601 format
const endDate = new Date(campaign.end_campaign.replace(' ', 'T'));
const formattedDate = endDate.toLocaleDateString('fr-FR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  });

  return (
    <main className="container mx-auto flex flex-col p-5">
      {/* Back link */}
      <section className="flex justify-start mt-5">
        <Link to="/campaigns" className='pr-1'>
          <FontAwesomeIcon icon={faChevronLeft} className='pr-1 ml-1' /> Retour
        </Link>
      </section>

      {/* Title campaign */}
      <section className='flex flex-row justify-evenly mt-2 p-1 items-center'>
        <h2 className="text-h2 items-center text-center mt-10 mb-10">
          Reforestation de la forêt du <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">{campaign.name}</span>
        </h2>
      </section>

      {/* Forest photo */}
      <section className="flex justify-evenly mt-5 mb-5">
        <img 
          src={`/Campaign_Images/${campaign.id}.webp`}
          alt={`forêt de ${campaign.name}`} 
          className="w-full max-w-sm md:max-w-md lg:max-w-lg h-100 rounded-[20px] object-cover"
        />
      </section>

      {/* Information campaign */}
      <section className="flex flex-col justify-between p-5 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 pl-3 mb-2">Contexte projet</h3>
        <p className="text-sm p-1 m-1">{campaign.description}</p>
        <p className="text-sm font-bold p-1 m-1">Date limite pour contribuer : {formattedDate}</p>
      </section>

      {/* Method campaign */}
      <section className="flex flex-col justify-between p-5 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 pl-3 mb-2">Comment allons nous procéder?</h3>
        <p className="text-sm p-1 m-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam maiores corporis.</p>
      </section>

      <section className='flex flex-row justify-evenly mt-2 p-1 items-center'>
        <h2 className="text-h2 items-center text-center mt-2 mb-10">
          Je<span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">contribue</span> à cette campagne ! 
        </h2>
      </section>

      {/* Trees of campaign */}
      <section className="flex flex-col justify-between p-5 mb-2 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 pl-3 mb-8">Notre sélection d'arbres adapté à cette campagne</h3>
        <p className="text-sm p-1 mb-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam maiores corporis.</p>
        <div>
          {campaign.treesCampaign.map(tree => (
            <TreesList 
              key={tree.id} 
              tree={{ 
                id: tree.id, 
                name: tree.name, 
                price_ht: tree.price_ht, 
                age: tree.age, 
                location: tree.location, 
                species: tree.species, 
                campaignCountry: campaign.location.country.name
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CampaignDetail;
