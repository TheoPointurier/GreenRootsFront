import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import Reviews from '../components/Reviews';
import { fetchReviews } from '../api/reviews'; // Assurez-vous que le chemin est correct
import type { ReviewsType } from '../@types/reviews';

function HomePage() {
  const navigate = useNavigate();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  // Images définies en dur dans HomePage
  const campaignImages = [
    {
      src: '/Images/planting-in-forest.webp',
      alt: 'Planting in Forest',
    },
    {
      src: '/Images/tea-field-plantation.webp',
      alt: 'Tea Field Plantation',
    },
    {
      src: '/Images/view-of-flower.webp',
      alt: 'View of Flower',
    },
  ];

  // État pour stocker les avis récupérés depuis l'API
  const [reviews, setReviews] = useState<ReviewsType[]>([]);

  // Déclare un état 'loading' de type boolean, initialisé à true, pour indiquer que les données sont en cours de chargement
  const [loading, setLoading] = useState<boolean>(true);

  // Déclare un état 'error' qui peut être une chaîne de caractères ou null, initialisé à null, pour stocker un message d'erreur en cas de problème
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les avis depuis l'API
  useEffect(() => {
    const loadReviews = async () => {
      try {
        // Appel API pour récupérer les avis et attend la réponse de l'API
        const data = await fetchReviews();
        // Stocke les avis dans l'état 'reviews'
        setReviews(data);
      } catch (err) {
        setError('Erreur lors de la récupération des avis.');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Affiche un message approprié en cas de chargement des avis ou d'erreur
  if (loading) {
    return <div>Chargement des avis...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Questions/Réponses pour la FAQ
  const faqs = [
    {
      id: 'faq1',
      question: 'Quelle est la mission de Greenroots ?',
      answer:
        "Greenroots vise à promouvoir la plantation d'arbres pour lutter contre le changement climatique.",
    },
    {
      id: 'faq2',
      question: 'Comment puis-je contribuer ?',
      answer:
        "Vous pouvez contribuer en achetant un arbre à planter dans l'une de nos campagnes.",
    },
    {
      id: 'faq3',
      question: 'Où sont plantés les arbres ?',
      answer:
        'Les arbres sont plantés dans différentes régions que vous pouvez choisir lors de votre contribution.',
    },
    {
      id: 'faq4',
      question: "Puis-je suivre l'impact de mon geste ?",
      answer:
        "Oui, vous recevrez des informations sur la croissance de l'arbre et l'impact en CO₂ absorbé.",
    },
  ];

  return (
    <div className="relative text-center mt-8 px-4">
      <h1 className="text-h1 font-bold text-black">
        Tu souhaites faire un geste
        <span className="bg-greenroots_green text-white rounded-lg px-4">
          éco-responsable ?
        </span>
      </h1>

      {/* Div contenant l'image */}
      <div className="relative mt-16">
        <img
          src="/Images/illustration_arbre.webp"
          alt="Illustration d'un arbre"
          className="w-full max-w-md mx-auto"
          loading="lazy"
        />

        {/* Section "Ce que nous te proposons" superposée */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/70 p-6 rounded-lg shadow-md backdrop-blur-sm max-w-xs w-full">
          <h2 className="text-h2 font-bold text-black">
            Ce que nous te proposons
          </h2>
          <p className="text-gray-700 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut
            bibendum massa.
          </p>
          <button
            onClick={() => navigate('/campaigns')}
            className="mt-6 bg-greenroots_orange text-white py-3 px-6 rounded-lg shadow-md hover:bg-greenroots_green transition-colors duration-300"
            type="button"
          >
            Je contribue
          </button>
        </div>
      </div>

      {/* Grille des Avis : Grille Adaptative */}
      <div
        className="grid gap-8 mt-16"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        <Reviews reviews={reviews} />
      </div>

      {/* Section Nos Campagnes */}
      <div className="mt-20">
        <h1 className="text-h1 font-bold text-greenroots_green mb-8">
          Nos campagnes
        </h1>
        <Carousel images={campaignImages} />
      </div>

      {/* Nouveau Titre */}
      <h1 className="text-h1 font-bold text-black mt-20">
        Gardes un visuel sur l'impact de{' '}
        <span className="bg-greenroots_green text-white rounded-lg px-4">
          ton geste
        </span>
      </h1>

      {/* Image et texte chevauché */}
      <div className="flex items-center justify-center mt-16 relative">
        <div className="relative z-10">
          <img
            src="/Images/weeping-willow-tree.webp"
            alt="Arbre pleureur"
            className="w-[300px] object-cover"
            loading="lazy"
          />
        </div>
        <div
          className="relative z-0 bg-white p-6 rounded-lg shadow-md ml-[-40px]"
          style={{ width: '300px' }}
        >
          <p className="text-gray-700 mb-4">
            Explication graph suivi, CO2, etc.
          </p>
          <button
            onClick={() => navigate('/campaigns')}
            className="bg-greenroots_orange text-white py-2 px-4 rounded-lg border border-white shadow-md hover:bg-greenroots_green transition-colors duration-300"
            type="button"
          >
            Je contribue
          </button>
        </div>
      </div>

      {/* Section FAQ */}
      <div className="mt-20">
        <h1 className="text-h1 font-bold text-greenroots_green mb-8">
          Une question ?
        </h1>
        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <button
              key={faq.id}
              className="bg-greenroots_green text-white p-4 rounded-lg shadow-md cursor-pointer text-left w-full"
              onClick={() =>
                setFaqOpenIndex(faqOpenIndex === index ? null : index)
              }
              type="button"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold">{faq.question}</p>
                <span className="ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-5 h-5 transform ${faqOpenIndex === index ? 'rotate-180' : ''}`}
                    aria-labelledby={`faq-icon-${index}`}
                  >
                    <title id={`faq-icon-${index}`}>Flèche déroulante</title>
                    <path
                      fillRule="evenodd"
                      d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.465l5.879-5.879a1 1 0 111.414 1.414L12 15.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {faqOpenIndex === index && (
                <div className="mt-4 bg-white text-gray-700 p-4 rounded-lg">
                  <p>{faq.answer}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
