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
    <div className="flex flex-col items-center justify-center pt-10 xl:mt-8">


      <section className="relative flex flex-col xl:py-8 xl:w-full xl:pt-14 xl:grid xl:grid-cols-2 xl:gap-8">
      <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-black  xl:flex xl:flex-col xl:items-center xl:col-span-2">
        Tu souhaite faire un geste
        <span className="bg-greenroots_green text-white rounded-lg px-4 pt-2 ml-2 mt-2">
          éco-responsable ?
        </span>
      </h1>

  {/* Image visible uniquement sur desktop */}


  <img
    src="/Images/japanese-maple-tree.webp"
    alt="Vue d'un érable japonais rouge avec des feuilles en automne"
    className="hidden xl:block xl:col-span-1 self-center justify-self-center"
    loading="lazy"
  />


  {/* Conteneur principal */}
  <div
  className="relative mt-8 xl:ml-12 flex flex-col items-center justify-center w-full  bg-illustration-arbre bg-contain bg-center bg-no-repeat  xl:col-span-1 "
>

<div
    className="absolute inset-0 bg-greenroots_sand/30 z-10"
    aria-hidden="true"
  />
    {/* Texte et contenu */}
    <div className="relative z-20 rounded-lg shadow-md max-w-md w-full  bg-white/80 m-10 p-4 sm:p-6 xl:p-8 xl:right-[35%] ">
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
      <div>
        <Reviews />
      </div>

      {/* Section Nos Campagnes */}
      <div className="mt-20">
        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-greenroots_green mb-8 ">
          Nos campagnes
        </h1>
        <Carousel images={campaignImages} />
      </div>

      <section className="flex flex-row p-6 mt-20  ">
      <div>
          <img
            src="/Images/weeping-willow-tree.webp"
            alt="Arbre pleureur"
            loading="lazy"
          />
        </div>
        <div className='bg-white/80 flex flex-col p-8 rounded-xl shadow-md'>
        <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-black pb-4 self-start">
          Garde un visuel sur l'impact de <span className="bg-greenroots_green text-white rounded-lg px-4 py-1">ton geste</span>
        </h2>
        <p className='text-sm sm:text-base xl:text-lg text-gray-700 '>En tant que contributeur, tu pourras garder un oeil sur l'impact de ta contribution !</p>
        <ul className='text-sm sm:text-base xl:text-lg text-gray-700 py-4'>
          <li>Arbres achetés: 9</li>
          <li className='my-1'>Co2 aborbé jusqu'à aujourdh'ui: 720kg * </li>
          <li>Campagnes auquelles j'ai contribué: Restauration de la Savane Africaine, Espaces Verts à New York  </li>
        </ul>
        <span className='text-sm text-gray-700'>* Pour une contribution de 9 arbres Eucalyptus sur une durée de deux années</span>
        <button
        onClick={() => navigate('/campaigns')}
          type="button"
          className="mt-6 bg-greenroots_orange text-white py-3 px-6 rounded-lg shadow-md hover:bg-greenroots_green transition-colors duration-300 self-start"
          aria-label="Accéder à la page des campagnes pour contribuer" 
        >
          Je contribue
        </button>
        </div>
      </section>

      {/* Section FAQ */}

      <section className="grid  grid-cols-2 w-full">
      
        <h1 className="text-h1 font-bold text-greenroots_green mb-8 col-span-2">
          Une question ?
        </h1>
        <div className=" grid col-span-2 grid-cols-2 gap-6 mb-10">
          {faqs.map((faq, index) => (
            <button
              key={faq.id}
              className="bg-greenroots_green text-white p-4 rounded-lg shadow-md cursor-pointer text-left"
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
      
      </section>
      
    </div>
  );
}

export default HomePage;
