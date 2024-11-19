export type ReviewsType = {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
  id_user: number;
};

export type ReviewsAdd = {
  content: string;
  rating: number;
};