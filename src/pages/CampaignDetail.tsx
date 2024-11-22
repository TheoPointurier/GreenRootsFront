import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { fetchCampaignById } from '../api/campaigns';
import TreesList from '../components/TreesList';
import type { Campaign } from '../@types/campaigns';
import type { TreeProps } from '../@types/trees';

function CampaignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!id) {
        navigate('/404');
        return;
      }
      try {
        const data = await fetchCampaignById(id);
        setCampaign(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la campagne:', error);
        navigate('/404');
      }
    };
    fetchCampaignData();
  }, [id, navigate]);

  if (!campaign) {
    return <p>Chargement des données...</p>;
  }

  const endDate = new Date(campaign.end_campaign.replace(' ', 'T'));
  const formattedDate = !Number.isNaN(endDate.getTime())
    ? endDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Date invalide';

  return (
    <main className="container flex flex-col p-5 mb-20">
      {/* Lien retour */}
      <section className="flex justify-start mt-5">
        <Link to="/campaigns" className="pr-1">
          <FontAwesomeIcon icon={faChevronLeft} className="pr-1 ml-1" /> Retour
        </Link>
      </section>

      {/* Nom campagne */}
      <section className="flex flex-row justify-evenly mt-2 p-1 items-center">
        <h2 className="text-h2 items-center text-center mt-10 mb-10">
          <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">
            {campaign.name}
          </span>
        </h2>
      </section>

      {/* Photo campagne */}
      <section className="flex justify-evenly mt-5 mb-5">
        <img
          src={`${import.meta.env.VITE_IMG_URL}/Campaign_Images/${campaign.id}.webp`}
          alt={`forêt de ${campaign.name}`}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg h-100 rounded-[20px] object-cover"
        />
      </section>

      {/* Information campagne */}
      <section className="flex flex-col justify-between p-5 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 pl-3 mb-2">Contexte projet</h3>
        <p className="text-sm p-1 m-1">{campaign.description}</p>
        <p className="text-sm font-bold p-1 m-1">
          Date limite pour contribuer : {formattedDate}
        </p>
      </section>

      {/* Méthode campagne */}
      <section className="flex flex-col justify-between p-5 mb-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 pl-3 mb-2">Comment allons nous procéder?</h3>
        <p className="text-sm p-1 m-1">
          Dans une démarche éco-responsable, nous privilégions des pratiques durables à chaque étape du processus. Une fois votre contribution effectuée, nous collaborons avec des experts locaux et des associations engagées pour planter les arbres sélectionnés, en respectant les écosystèmes existants. Nous utilisons des techniques de plantation qui minimisent l’impact environnemental, tout en assurant une croissance optimale des arbres. Vous serez régulièrement informé(e) de l’avancée du projet, parce que votre geste mérite d’être suivi et valorisé.
        </p>
      </section>

      <section className="flex flex-row justify-evenly mt-2 p-1 items-center">
        <h2 className="text-h2 items-center text-center mt-2 mb-10">
          Je
          <span className="bg-greenroots_green text-greenroots_white rounded-[20px] ml-2 pt-1 pb-1 pl-3 pr-3">
            contribue
          </span>{' '}
          à cette campagne !
        </h2>
      </section>

      {/* Arbres de la campagne */}
      <section className="flex flex-col justify-between p-5 rounded-t-[20px] rounded-b-[20px] border border-grey shadow-xl">
        <h3 className="text-h3 pl-3 mb-8">
          Notre sélection d'arbres adaptée à cette campagne
        </h3>
        <p className="text-sm p-1 mb-4">
          Pour cette campagne, nous avons sélectionné des espèces d'arbres parfaitement adaptées aux conditions locales. Ces essences ont été choisies pour leur capacité à s’épanouir durablement, tout en offrant des bénéfices écologiques tels que la régénération des sols, la réduction du CO₂ atmosphérique, et le soutien à la faune environnante.
        </p>
        <div className="flex flex-wrap justify-evenly gap-4">
          {campaign.treesCampaign.map((tree) => (
            <div
              key={tree.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <TreesList
                tree={
                  {
                    ...tree,
                    campaignCountry: campaign.location.country.name,
                    campaignName: campaign.name,
                    campaignId: campaign.id,
                  } as TreeProps['tree']
                }
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CampaignDetail;
