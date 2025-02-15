export type ProductDTO = {
  data: {
    sellerID: string;
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

export type ProductDataDTO = {
  sellerID: string;
  color: string;
  createdAt: string;
  description: string;
  imageURL: string;
  price: number;
  productID: string;
  productName: string;
  tag: string[];
}

export type ProductsDTO = {
  data: ProductDataDTO[];
  message: string;
  status: number;
  success: boolean;
}
