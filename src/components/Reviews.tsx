import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import type { ReviewsType } from '../@types/reviews';
import './Reviews.css';

interface ReviewsProps {
  reviews: ReviewsType[];
}

function Reviews({ reviews = [] }: ReviewsProps) {
  // Fonction pour mélanger un tableau de manière aléatoire
  const shuffleArray = (array: ReviewsType[]): ReviewsType[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Mélanger les avis et en prendre les 3 premiers
  const randomReviews = shuffleArray(reviews).slice(0, 3);

  return (
    <div
      className="grid gap-8 mt-16"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}
    >
      {randomReviews.map((review) => (
        <div
          key={review.id}
          className="bg-greenroots_green p-4 rounded-lg text-white"
          style={{
            boxShadow:
              '-4px -4px 4px rgba(205, 92, 8, 1), 4px 4px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div className="flex flex-row justify-center mb-5">
            {/* Afficher les étoiles en fonction du rating */}
            {[...Array(review.rating)].map((_, starIndex) => (
              <FontAwesomeIcon
                key={`${review.id}-${starIndex}`}
                icon={faStar}
                style={{ color: '#FFD43B' }}
                className="text-h3 font-bold m-1 rotate-animation" // Ajout de la classe d'animation
              />
            ))}
          </div>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
