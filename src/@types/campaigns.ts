import type { Tree } from './trees';

export interface Campaign {
  id: number;
  name: string;
  description: string;
  start_campaign: string;
  end_campaign: string;
  location: {
    name_location: string;
    country: {
      name: string;
    };
  };
  treesCampaign: Tree[];
}

export interface CampaignsListProps {
  campaigns: Campaign[];
}
