import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Carousel from '../components/Carousel';
import Reviews from '../components/Reviews';

function HomePage() {
  const navigate = useNavigate();
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const campaignImages = Array.from({ length: 7 }, (_, i) => ({
    src: `/Campaign_Images/${i + 1}.webp`,
    alt: `Campaign Image ${i + 1}`,
  }));

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
    <div className="flex flex-col items-center justify-center pt-[40px] xl:pt-[80px]">


      <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-black xl:text-center xl:flex xl:flex-col xl:items-center">
        Tu souhaites faire un geste
        <span className="bg-greenroots_green text-white rounded-lg px-4 ml-2">
          éco-responsable ?
        </span>
      </h1>

      <section className="relative flex flex-col xl:flex-row xl:gap-20 xl:pl-20 items-center justify-center xl:py-8">
  {/* Image visible uniquement sur desktop */}
  <img
    src="/Images/japanese-maple-tree.webp"
    alt="Vue d'un érable japonais rouge avec des feuilles en automne"
    className="hidden xl:block w-1/2 object-contain"
    loading="lazy"
  />

  {/* Conteneur principal */}
  <div
  className="relative mt-8 xl:ml-12 flex flex-col items-center justify-center w-full xl:w-2/3 bg-illustration-arbre bg-contain bg-center bg-no-repeat "
>

    {/* Texte et contenu */}
    <div className="relative z-20 rounded-lg shadow-md max-w-md w-full text-center bg-white/70 m-10 p-4 sm:p-6 xl:p-8">
  <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-black">
    Ce que nous te proposons
  </h2>
  <p className="text-sm sm:text-base xl:text-lg text-gray-700 mt-4">
    Faire un geste en quelques clics pour lutter contre le changement climatique.
  </p>
  <p className="text-sm sm:text-base xl:text-lg text-gray-700 mt-4">
    En rejoignant notre initiative, tu contribues à des projets concrets de reforestation et à la préservation de la biodiversité.
  </p>
  <button
    onClick={() => navigate('/campaigns')}
    className="mt-6 bg-greenroots_orange text-white py-3 px-6 rounded-lg shadow-md hover:bg-greenroots_green transition-colors duration-300"
    aria-label="Accéder à la page des campagnes pour contribuer"
    type="button"
  >
    Je contribue
  </button>
</div>

  </div>
</section>


      {/* Grille des Avis : Grille Adaptative */}
      <div
        className="grid gap-8 mt-16"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
      >
        <Reviews />
      </div>

      {/* Section Nos Campagnes */}
      <div className="mt-20">
        <h1 className="text-h1 font-bold text-greenroots_green mb-8">
          Nos campagnes
        </h1>
        <Carousel images={campaignImages} />
      </div>

      <h1 className="text-h1 font-bold text-black mt-20">
        Gardes un visuel sur l'impact de{' '}
        <span className="bg-greenroots_green text-white rounded-lg px-4">
          ton geste
        </span>
      </h1>

      <div className="flex items-center justify-center mt-16 relative">
        <div className="relative z-10">
          <img
            src="/Images/weeping-willow-tree.webp"
            alt="Arbre pleureur"
            className="w-[300px] xl:w-[700px] object-cover" // Taille par défaut pour les petits écrans et agrandie pour les écrans XL
            loading="lazy"
          />
        </div>
        <div
          className="relative z-0 bg-white p-6 rounded-lg shadow-md ml-[-40px] w-[300px] xl:w-[500px] xl:ml-[-100px] xl:py-20" // Taille et marge ajustée pour XL
        >
         <p className="text-gray-700 mb-4 xl:pb-10">
  Tu vas pouvoir suivre la croissance de l'arbre que tu as contribué à planter, son impact en CO₂ absorbé,
  et les informations détaillées sur la campagne associée.</p>

  <p className="text-gray-700 mb-4 xl:pb-10 font-bold">
  Prends enfin conscience de l'impact de ton geste pour la planète !
 
</p>
          <button
            onClick={() => navigate('/campaigns')}
            className="bg-greenroots_orange text-white py-2 px-4 rounded-lg border border-white shadow-md hover:bg-greenroots_green transition-colors duration-300"
            aria-label="Afficher la liste des campagnes pour contribuer"
            type="button"
          >
            Je contribue
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-20 pb-24 md:ml-[2rem] md:mr-[2rem] xl:ml-[7rem] xl:mr-[7rem]">
        <h1 className="text-h1 font-bold text-greenroots_green mb-8">
          Une question ?
        </h1>
        <div className="grid gap-4 xl:grid-cols-2 gap-x-12">
          {faqs.map((faq, index) => (
            <button
              key={faq.id}
              className="bg-greenroots_green text-white p-4 rounded-lg shadow-md cursor-pointer text-left w-full"
              onClick={() =>
                setFaqOpenIndex(faqOpenIndex === index ? null : index)
              }
              aria-label="Afficher la réponse à la question"
              type="button"
              aria-expanded={faqOpenIndex === index ? 'true' : 'false'}
              aria-controls={`faq-answer-${index}`}
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
                    <title id={`faq-icon-${index}`}>
                      Flèche déroulante pour la FAQ
                    </title>
                    <path
                      fillRule="evenodd"
                      d="M12 15.293l-6.293-6.293a1 1 0 111.414-1.414L12 12.465l5.879-5.879a1 1 0 111.414 1.414L12 15.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              {faqOpenIndex === index && (
                <div className="mt-4 bg-greenroots_sand text-gray-700 p-4 rounded-lg">
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
