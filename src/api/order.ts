import apiClient from './apiClient';
import type { OrderData } from '../@types/Order';

export async function createOrder(orderData: OrderData) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token non trouvé dans localStorage');
      throw new Error('Token non trouvé');
    }

    console.log('Données préparées avant l\'appel API :', JSON.stringify(orderData, null, 2));

    const response = await apiClient('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    console.log('Statut de la réponse API :', response?.status);
    console.log('Réponse brute de l\'API :', response);

    if (!response || !response.createdOrder) {
      console.error('Erreur de réponse de l\'API :', response);
      throw new Error(`Erreur API: ${response?.message || 'Réponse API invalide'}`);
    }

    return response;
  } catch (error) {
    console.error('Erreur dans createOrder :', error);
    throw error;
  }
}
