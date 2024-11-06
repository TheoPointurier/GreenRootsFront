import apiClient from './apiClient';

export const fetchTrees = async () => {
  return apiClient('/trees');
};

export const fetchTreeById = async (id: string) => {
  return apiClient(`/trees/${id}`);
};
