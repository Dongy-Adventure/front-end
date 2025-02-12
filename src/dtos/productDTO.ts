export type ProductDTO = {
  data: {
    SellerID: string;
    color: string;
    createdAt: string;
    description: string;
    imageURL: string;
    price: number;
    productID: string;
    productName: string;
    tag: string[];
  };
  message: string;
  status: number;
  success: boolean;
};
