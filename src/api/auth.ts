import apiClient from './apiClient';
import type { LoginData, RegisterData } from '../@types/users';

export async function login(data: LoginData) {
  return await apiClient('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterData) {
  console.log("Données envoyées au backend:", data);
  return await apiClient('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
