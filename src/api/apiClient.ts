let navigate: ((path: string) => void) | null = null;

export const setNavigate = (navigateFn: (path: string) => void) => {
  navigate = navigateFn;
};

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
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
    if (error instanceof TypeError && navigate) {
      navigate('/500');
    }
    throw error;
  }
};

export default apiClient;
