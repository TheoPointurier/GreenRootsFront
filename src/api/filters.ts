import apiClient from './apiClient';

export const fetchCountries = async (): Promise<string[]> => {
  try {
    const response = await apiClient('/countries');
    return response.map((country: { name: string }) => country.name);
  } catch (error) {
    console.error("Erreur lors de la récupération des pays:", error);
    return [];
  }
};

export const fetchSpecies = async (): Promise<string[]> => {
  try {
    const response = await apiClient('/species');
    return response.map((species: { species_name: string }) => species.species_name);
  } catch (error) {
    console.error("Erreur lors de la récupération des espèces:", error);
    return [];
  }
};

