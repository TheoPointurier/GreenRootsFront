import type { Tree } from './trees';
import type { Campaign } from './campaigns';

export interface OrderLine {
  id?: number;
  price_ht_at_order: number;
  quantity: number;
  total_amount: number;
  id_campaign: number;
  id_tree: number;
  tree?: Tree;
  campaign?: Campaign;
  tree_name?: string;
  tree_image?: string;
  campaign_name?: string;
  campaign_location?: string;
  country_name?: string;
}

export interface OrderData {
  id?: number;
  total_amount: number;
  status: string;
  order_number: string;
  orderLines: (OrderLine | OrderLineInput)[];
}

export interface OrderLineInput {
  price_ht_at_order: number;
  quantity: number;
  total_amount: number;
  id_campaign: number;
  id_tree: number;
}