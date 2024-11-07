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
