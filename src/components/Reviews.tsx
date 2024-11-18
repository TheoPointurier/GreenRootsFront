import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchReviews } from '../api/reviews';
import type { ReviewsType } from '../@types/reviews';
import './Reviews.css';


function Reviews() {
  // Déclare les états pour les avis, le chargement et les erreurs
  const [reviews, setReviews] = useState<ReviewsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les avis depuis l'API
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setReviews(data);
      } catch (err) {
        setError('Erreur lors de la récupération des avis.');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Afficher un message de chargement ou d'erreur
  if (loading) {
    return <div aria-live="polite">Chargement des avis...</div>;
  }

  if (error) {
    return <div role="alert" aria-live="assertive">{error}</div>;
  }

  // Fonction pour mélanger un tableau de manière aléatoire
  const shuffleArray = (array: ReviewsType[]): ReviewsType[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Mélanger les avis et en prendre les 3 premiers
  const randomReviews = shuffleArray(reviews).slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mt-16 ">
      {/* Section des reviews */}
      <section
        className="flex flex-wrap gap-8 justify-center justify-self-auto xl:mr-8"
        style={{ minWidth: '300px' }}
      >
        {randomReviews.map((review) => (
          <div
            key={review.id}
            className="bg-greenroots_green p-4 rounded-lg text-white w-[300px] sm:w-[400px] sm:h-auto"
            style={{
              boxShadow:
                '-4px -4px 4px rgba(205, 92, 8, 1), 4px 4px 4px rgba(0, 0, 0, 0.3)',
            }}
            aria-labelledby={`review-${review.id}`} // Lier à l'élément parent pour les technologies d'assistance
          >
            <div className="flex flex-row justify-center mb-5">
              {[...Array(review.rating)].map((_, starIndex) => (
                <FontAwesomeIcon
                  key={`${review.id}-${starIndex}`}
                  icon={faStar}
                  style={{ color: '#FFD43B' }}
                  className="text-h3 font-bold m-1 rotate-animation"
                  aria-hidden="true" // Rendre l'icône invisible pour les lecteurs d'écran
                />
              ))}
            </div>
            <p>{review.content}</p>
          </div>
        ))}
      </section>
    
    </div>
  );
}

export default Reviews;
