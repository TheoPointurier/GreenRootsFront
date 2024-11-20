// src/api/apiClient.ts
import type { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction | null = null;

export const setNavigate = (navigateFn: NavigateFunction) => {
  navigate = navigateFn;
};

// src/api/apiClient.ts
export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      if (navigate) {
        if (response.status === 404) {
          navigate('/404');
        } else if (response.status >= 500) {
          navigate('/500');
        }
      }
      throw new Error(`Erreur HTTP ! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (navigate) {
      navigate('/500');
    }
    console.error('Erreur dans apiClient:', error);
    throw error;
  }
};



export default apiClient;
