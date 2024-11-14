import apiClient from './apiClient';

export const fetchCampaigns = async () => {
  return apiClient('/campaigns');
};

export const fetchCampaignById = async (id: string) => {
  return apiClient(`/campaigns/${id}`);
};
