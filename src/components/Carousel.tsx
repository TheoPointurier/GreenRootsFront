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

    return () => clearInterval(interval); // Nettoyer l'intervalle quand le composant est démonté
  }, [images.length]);

  // Pour changer manuellement d'image
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden lg:max-w-4xl xl:max-w-3xl">
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
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-greenroots_orange text-white py-2 px-4 rounded-lg border border-white shadow-md hover:bg-greenroots_green transition-colors duration-300"
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
    </div>
  );
}

export default Carousel;
