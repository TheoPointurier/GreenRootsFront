import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

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
          >
            Je contribue
          </button>
        </div>
      </div>

      {/* Grille des Avis : 3 Divs sur 1 Ligne */}
      <div className="grid grid-cols-3 gap-8 mt-16">
        {/* Première Div */}
        <div className="bg-greenroots_green p-6 rounded-lg text-white"
             style={{
               boxShadow: '-4px -4px 4px rgba(205, 92, 8, 0.9), 4px 4px 4px rgba(0, 0, 0, 0.3)'
             }}>
          <h3 className="text-xl font-bold mb-4">Note</h3>
          <p>Mon avis</p>
        </div>

        {/* Deuxième Div */}
        <div className="bg-greenroots_green p-6 rounded-lg text-white"
             style={{
               boxShadow: '-4px -4px 4px rgba(205, 92, 8, 0.9), 4px 4px 4px rgba(0, 0, 0, 0.3)'
             }}>
          <h3 className="text-xl font-bold mb-4">Note</h3>
          <p>Mon avis</p>
        </div>

        {/* Troisième Div */}
        <div className="bg-greenroots_green p-6 rounded-lg text-white"
             style={{
               boxShadow: '-4px -4px 4px rgba(205, 92, 8, 0.9), 4px 4px 4px rgba(0, 0, 0, 0.3)'
             }}>
          <h3 className="text-xl font-bold mb-4">Note</h3>
          <p>Mon avis</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
