const apiUrl = import.meta.env.VITE_API_URL;

// Dans apiClient
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  console.log("Réponse brute de l'API:", response);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ! status: ${response.status}`);
  }

  const data = await response.json();
  console.log("Données JSON de l'API:", data);
  return data;
};


export default apiClient;