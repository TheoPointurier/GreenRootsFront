// @types/users.ts

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  city: string;
  postal_code: string;
  street: string;
  street_number: number;
  country: string;
  id_role: number;
  phone_number?: string;
  entity_name?: string;
  entity_type?: string;
  entity_siret?: string;
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

export type Roles = {
  id: number;
  name: string;
  role_description: string;
};

export type UserInfoProps = {
  user: User;
};

// Ajoute ici les types LoginData et RegisterData
export interface LoginData {
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
  street_number: string; // Type string car reçu en tant que chaîne depuis le formulaire
  country: string;
  id_role: string; // Type string car reçu en tant que chaîne depuis le formulaire
  phone_number?: string;
  entity_name?: string;
  entity_type?: string;
  entity_siret?: string;
}
