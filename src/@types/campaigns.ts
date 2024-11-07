/*export interface Campaign {
  id_campaign: number;
  name: string;
  description: string;
  start_campaign: string;
  end_campaign: string;
  created_at: string;
  updated_at: string;
  id_tree: number;
}*/

export interface Campaign {
  id: number;
  name: string;
  description: string;
  location: {
    name_location: string;
    country: {
      name: string;
    };
  };
  treesCampaign: {
    id: number;
    name: string;
    price_ht: number;
    age: number;
    location: string;
    species: {
      species_name: string;
    };
  }[];
}

export interface CampaignsListProps {
  campaigns: Campaign[];
}

/*export interface Campaign {
  id: number;
  name: string;
  description: string;
  end_campaign: string;
  location: {
    name_location: string;
    country: {
      name: string;
    };
  };
  treesCampaign: Tree[];
}*/