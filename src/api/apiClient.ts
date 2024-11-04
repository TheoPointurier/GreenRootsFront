const apiUrl = import.meta.env.VITE_API_URL;

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${apiUrl}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP ! status: ${response.status}`);
  }

  return response.json();
};

export default apiClient;