export type ProductDTO = {
  data: {
    amount: number;
    sellerID: string;
    color: string;
    createdAt: string;
    description: string;
    image: string;
    price: number;
    productID: string;
    productName: string;
    tag: string[];
  };
  message: string;
  status: number;
  success: boolean;
};

export type ProductDataDTO = {
  amount: number;
  sellerID: string;
  color: string;
  createdAt: string;
  description: string;
  image: string;
  price: number;
  productID: string;
  productName: string;
  tag: string[];
};

export type ProductsDTO = {
  data: ProductDataDTO[];
  message: string;
  status: number;
  success: boolean;
};
