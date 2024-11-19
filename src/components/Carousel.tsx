import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Carousel({ images }: { images: Array<{ src: string; alt: string }> }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(window.innerWidth >= 1280 ? 3 : 1);
  const navigate = useNavigate();


  // Étendre les images pour un effet de boucle
  const extendedImages = [
    ...images.slice(-imagesPerView), // Ajouter les dernières images au début
    ...images,
    ...images.slice(0, imagesPerView), // Ajouter les premières images à la fin
  ];

  const visibleWidthPercentage = 100 / imagesPerView;


// Met à jour `imagesPerView` en cas de redimensionnement
useEffect(() => {
  const handleResize = () => {
    setImagesPerView(window.innerWidth >= 1280 ? 3 : 1);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Pour faire défiler automatiquement
useEffect(() => {
  const interval = setInterval(() => {
    goToNextSlide();
  }, 5000); // Changer toutes les 5 secondes

  return () => clearInterval(interval);
}, []);

// Gestion du défilement vers la gauche
const goToPrevSlide = () => {
  if (currentIndex === 0) {
    // Réinitialiser à la position réelle
    setCurrentIndex(extendedImages.length - 2);
  } else {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }
};

// Gestion du défilement vers la droite
const goToNextSlide = () => {
  if (currentIndex === extendedImages.length - 1) {
    // Réinitialiser à la position réelle
    setCurrentIndex(1);
  } else {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }
};

 // Réinitialiser la position pour la boucle infinie
 useEffect(() => {
  if (currentIndex >= extendedImages.length - imagesPerView) {
    setTimeout(() => setCurrentIndex(imagesPerView), 0); // Réinitialiser après la dernière image
  }
  if (currentIndex < imagesPerView) {
    setTimeout(() => setCurrentIndex(extendedImages.length - imagesPerView * 2), 0); // Réinitialiser avant la première image
  }
}, [currentIndex, extendedImages.length, imagesPerView]);



// Changer instantanément la position si en bordure (boucle infinie)
useEffect(() => {
  if (currentIndex === 0) {
    setTimeout(() => setCurrentIndex(extendedImages.length - 2), 0);
  } else if (currentIndex === extendedImages.length - 1) {
    setTimeout(() => setCurrentIndex(1), 0);
  }
}, [currentIndex, extendedImages.length]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * visibleWidthPercentage)}%)`,
          width: "100%",
        }}
      >
        {extendedImages.map((image, index) => (
          <div
        key={`${image.alt}-${index}`} // Combinaison de l'alt et de l'index pour garantir l'unicité
         className="flex-shrink-0 relative"
          style={{
            width: `${visibleWidthPercentage}%`,
          }}>
            <img
              src={image.src}
              alt={image.alt}
              className=" w-full object-cover h-64
              "  // Taille uniforme des images
            />
             {/* Bouton accessible pour chaque image */}
             <button
              onClick={() => navigate('/campaigns')}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-greenroots_orange text-white py-2 px-4 rounded-lg border border-white shadow-md hover:bg-greenroots_green transition-colors duration-300"
              aria-label={`Accéder à la campagne pour ${image.alt}`}
              type="button"
            >
              Accéder
            </button>
          </div>
        ))}
      </div>

    
      
      {/* Flèche gauche (précédente) */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
        onClick={goToPrevSlide}
        aria-label="Slide précédente"
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-orange-500 group-hover:bg-orange-400 duration-300 group-focus:ring-4 group-focus:ring-orange-500 group-focus:outline-none">
          <svg
            className="w-5 h-5 text-white sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Slide précédent</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
      </button>

      {/* Flèche droite (suivante) */}
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
        onClick={goToNextSlide}
        aria-label="Slide suivante"
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-orange-500 group-hover:bg-orange-400 duration-300 group-focus:ring-4 group-focus:ring-orange-500 group-focus:outline-none">
          <svg
            className="w-5 h-5 text-white sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Slide suivant</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default Carousel;
