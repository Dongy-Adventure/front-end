export type Buyer = {
  buyerId: string;
  name: string;
  surname: string;
  userType: 'Buyer';
};

export type Seller = {
  sellerId: string;
  name: string;
  surname: string;
  paymentInfo: string;
  role: string;
  score: number;
  userType: 'Seller';
};
