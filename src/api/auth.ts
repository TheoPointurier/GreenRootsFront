// src/api/auth.ts

import apiClient from './apiClient';

interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  city: string;
  postal_code: string;
  street: string;
  street_number: string;
  country: string;
  id_role: string;
  phone_number?: string;
  entity_name?: string;
  entity_type?: string;
  entity_siret?: string;
}

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

