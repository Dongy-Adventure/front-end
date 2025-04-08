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

export type AdvertisementDataDTO = {
  advertisementID: string;
  amount: number;
  createdAt: string;
  imageURL: string;
  payment: string;
  productID: string;
  sellerID: string;
};

export type AdvertisementsDTO = {
  data: AdvertisementDataDTO[];
  message: string;
  status: number;
  success: boolean;
};
