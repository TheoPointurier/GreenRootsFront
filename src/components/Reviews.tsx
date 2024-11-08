import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { fetchReviews } from '../api/reviews'; // Assurez-vous que le chemin est correct
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
    return <div>Chargement des avis...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Fonction pour mélanger un tableau de manière aléatoire
  const shuffleArray = (array: ReviewsType[]): ReviewsType[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Mélanger les avis et en prendre les 3 premiers
  const randomReviews = shuffleArray(reviews).slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
      {/* Section des reviews */}
      <section
        className="flex flex-wrap gap-8 justify-center justify-self-auto"
        style={{ minWidth: '300px' }}
      >
        {randomReviews.map((review) => (
          <div
            key={review.id}
            className="bg-greenroots_green p-4 rounded-lg text-white w-[300px] sm:w-[300px]"
            style={{
              boxShadow:
                '-4px -4px 4px rgba(205, 92, 8, 1), 4px 4px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div className="flex flex-row justify-center mb-5">
              {[...Array(review.rating)].map((_, starIndex) => (
                <FontAwesomeIcon
                  key={`${review.id}-${starIndex}`}
                  icon={faStar}
                  style={{ color: '#FFD43B' }}
                  className="text-h3 font-bold m-1 rotate-animation"
                />
              ))}
            </div>
            <p>{review.content}</p>
          </div>
        ))}
      </section>
      {/* Section visuel impact */}
      <section className="bg-white p-6 rounded-lg shadow-md xl:w-1/3 w-[400px] sm:w-[500px] 2xl:w-[700px]">
        <h2 className="text-2xl font-bold mb-4">
          Gardes un visuel sur l'impact de{' '}
          <span className="text-greenroots_teal">ton geste</span>
        </h2>
        <p className="mb-4">
          Explication graph suivi, co2 etc... Lorem ipsum has been the
          industry's standard text.
        </p>
        <img
          src="/Images/graphic_co2.jpg"
          alt="Graphique de l'impact"
          className="mb-4"
        />
        <button
          type="button"
          className="bg-greenroots_orange text-white px-4 py-2 rounded-full hover:bg-orange-600"
        >
          Je contribue
        </button>
      </section>
    </div>
  );
}

export default Reviews;
