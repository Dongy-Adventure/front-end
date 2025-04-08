export type AdvertisementDTO = {
  data: {
    advertisementID: string;
    amount: number;
    createdAt: string;
    imageURL: string;
    payment: string;
    productID: string;
    sellerID: string;
  };
  message: string;
  status: number;
  success: boolean;
};
