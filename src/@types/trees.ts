export interface Tree {
  id_tree: number;
  name: string;
  price_HT: number;
  quantity?: number;
  age: number;
  created_at: string;
  updated_at: string;
  id_species: number;
}

export interface TreeSpecies {
  id_species: number;
  species_name: string;
  description: string;
  co2_absorption: number;
  average_lifespan: number;
}