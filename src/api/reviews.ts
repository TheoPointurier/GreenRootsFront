import apiClient from './apiClient';

// Récupère tous les avis depuis l'API
export const fetchReviews = async () => {
  return apiClient('/reviews');

};
