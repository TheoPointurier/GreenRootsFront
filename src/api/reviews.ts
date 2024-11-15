import apiClient from './apiClient';

// Fonction pour récupérer les avis
export const fetchReviews = async () => {
  return apiClient('/reviews');

};

// Fonction pour créer un avis
export const createReview = async (review: { content: string; rating: number; id_user: number }) => {
  return apiClient('/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });
};