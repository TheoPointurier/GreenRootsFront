export type Users = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone_number?: number;
  street_number: number;
  street: string;
  city: string;
  postal_code: number;
  country: string;
  entity_name: string;
  entity_type: string;
  entity_siret: string;
  ingredients: Roles[];
};

export type Roles = {
  id: number;
  name: string;
  role_description: string;
};
