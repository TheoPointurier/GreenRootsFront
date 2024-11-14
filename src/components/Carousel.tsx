import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Carousel({ images }: { images: Array<{ src: string, alt: string }> }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Pour faire défiler automatiquement
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changer toutes les 5 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  // Pour changer manuellement d'image
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Pour aller à la slide précédente
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Pour aller à la slide suivante
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-full lg:max-w-xl xl:max-w-xl mx-auto overflow-hidden">
      {/* Images */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image.alt} className="min-w-full relative">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => navigate('/campaigns')}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-greenroots_orange text-white py-2 mb-4 px-4 rounded-lg border border-white shadow-md hover:bg-greenroots_green transition-colors duration-300"
              aria-label="Bouton pour accéder à la liste des campagnes"
              type="button"
            >
              Accéder
            </button>
          </div>
        ))}
      </div>

      {/* Indicateurs de navigation */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((image, index) => (
          <button
            key={image.alt}
            className={`w-5 h-5 rounded-full ${index === currentIndex ? 'bg-greenroots_orange' : 'bg-gray-300'}`}
            onClick={() => goToSlide(index)}
            aria-label="Boutons carroussel pour faire défiler les photos de campagnes"
            type="button"
          />
        ))}
      </div>
      {/* Flèche gauche (précédente) */}

<button
  type="button"
  className="absolute top-0 left-0 z-30 flex justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
  onClick={goToPrevSlide}
  aria-label="Slide précédente"
>
  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-orange-500 group-hover:bg-orange-400 group-focus:ring-4 group-focus:ring-orange-500 group-focus:outline-none">
    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Slide précédent</title>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
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
  <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-orange-500 group-hover:bg-orange-400 group-focus:ring-4 group-focus:ring-orange-500 group-focus:outline-none">
    <svg className="w-5 h-5 text-white sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Slide suivant</title>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </span>
</button>


    </div>
  );
}

export default Carousel;
