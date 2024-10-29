import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
//import { useEffect, useState } from 'react';  (à décommenter quand l'API sera prête)

function HomePage() {
  const navigate = useNavigate();

  // Images définies en dur dans HomePage
  const campaignImages = [
    {
      src: '/Images/planting-in-forest.jpg',
      alt: 'Planting in Forest',
    },
    {
      src: '/Images/tea-field-plantation.jpg',
      alt: 'Tea Field Plantation',
    },
    {
      src: '/Images/view-of-flower.jpeg',
      alt: 'View of Flower',
    },
  ];

  // Partie qui cherchera les images depuis l'API (à décommenter quand l'API sera prête)
// const [campaignImages, setCampaignImages] = useState([]);
// 
// useEffect(() => {
//   fetch('/api/campaigns/images')
//     .then((response) => response.json())
//     .then((data) => {
//       setCampaignImages(data.images);
//     });
// }, []);

  return (
    <div className="relative text-center mt-8 px-4">
      <h1 className="text-3xl font-bold text-black">
        Tu souhaites faire un geste
        <span className="block bg-greenroots_green text-white rounded-lg px-4 py-2 mt-2">
          éco-responsable ?
        </span>
      </h1>

      {/* Div contenant l'image */}
      <div className="relative mt-16">
        <img
          src="/Images/illustration_arbre.webp"
          alt="Illustration d'un arbre"
          className="w-full max-w-md mx-auto"
        />

        {/* Section "Ce que nous te proposons" superposée */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/70 p-6 rounded-lg shadow-md backdrop-blur-sm max-w-xs w-full">
          <h1 className="text-2xl font-bold text-black">
            Ce que nous te proposons
          </h1>
          <p className="text-gray-700 mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut bibendum massa.
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
      <div className="grid gap-8 mt-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {/* Avis */}
        <div className="bg-greenroots_green p-4 rounded-lg text-white"
             style={{
               boxShadow: '-4px -4px 4px rgba(205, 92, 8, 1), 4px 4px 4px rgba(0, 0, 0, 0.3)'
             }}>
          <h3 className="text-xl font-bold mb-3">Note</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum est ac orci tincidunt, 
            vitae tincidunt nunc lacinia. Maecenas fringilla pulvinar urna.
          </p>
        </div>
        <div className="bg-greenroots_green p-4 rounded-lg text-white"
             style={{
               boxShadow: '-4px -4px 4px rgba(205, 92, 8, 1), 4px 4px 4px rgba(0, 0, 0, 0.3)'
             }}>
          <h3 className="text-xl font-bold mb-3">Note</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum est ac orci tincidunt, 
            vitae tincidunt nunc lacinia. Maecenas fringilla pulvinar urna.
          </p>
        </div>
        <div className="bg-greenroots_green p-4 rounded-lg text-white"
             style={{
               boxShadow: '-4px -4px 4px rgba(205, 92, 8, 1), 4px 4px 4px rgba(0, 0, 0, 0.3)'
             }}>
          <h3 className="text-xl font-bold mb-3">Note</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin fermentum est ac orci tincidunt, 
            vitae tincidunt nunc lacinia. Maecenas fringilla pulvinar urna.
          </p>
        </div>
      </div>

      {/* Section Nos Campagnes */}
      <div className="mt-20">
        <h1 className="text-3xl font-bold text-greenroots_green mb-8">
          Nos campagnes
        </h1>
        <Carousel images={campaignImages} />
      </div>
    </div>
  );
}

export default HomePage;
