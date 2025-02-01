export type Buyer = {
  buyerID: string;
  name: string;
  surname: string;
  username: string;
  userType: 'Buyer';
};

export type Seller = {
  name: string;
  payment: string;
  sellerID: string;
  surname: string;
  username: string;
  userType: 'Seller';
};
