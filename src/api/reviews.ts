import apiClient from './apiClient';

// Fonction pour récupérer les avis
export const fetchReviews = async () => {
  return apiClient('/reviews');

};

// Fonction pour créer un avis
export const createReview = async (review: { content: string; rating: number }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token non trouvé dans localStorage');
    throw new Error('Token non trouvé');
  }

  return apiClient('/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(review)
  });
};