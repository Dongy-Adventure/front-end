export type ReviewDataDTO = {
  buyerName: string;
  buyerID: string;
  date: string;
  image: string;
  message: string;
  reviewID: string;
  score: number;
  sellerID: string;
  sellerName: string;
};

export type ReviewDTO = {
  data: ReviewDataDTO[];
  message: string;
  status: number;
  success: boolean;
};
