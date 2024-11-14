import apiClient from './apiClient';

export const fetchReviews = async () => {
  return apiClient('/reviews');

};
