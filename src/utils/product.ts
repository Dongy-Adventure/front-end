import { getAccessToken, getUserId } from './auth';
import { AxiosResponse } from 'axios';
import { ProductDTO } from '@/dtos/productDTO';
import { apiClient } from './axios';
import { Product } from '@/types/product';

export const createProduct = async (
  name: string,
  price: number,
  description: string,
  image: string,
  color: string,
  tag: string[]
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    console.error('Cannot Create Product.');
    return false;
  }
  try {
    const res: AxiosResponse<ProductDTO> = await apiClient.post(
      `/product/`,
      {
        sellerID: userId,
        productName: name,
        price: price,
        description: description,
        image: image,
        tag: tag,
        color: color,
        createdAt: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.status) {
      console.error(res.data.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getProductById = (pid: string ): Product => { 


  const mockProductData: Product = {
    productID: pid,
    tag: ["Dried fruit"],
    productName: "Potato Chips 52g, American Cream & Onion Flavour, Crunchy Chips & Snacks.",
    price: 201,
    sellerID: "1000",
    color: "",
    createdAt: "",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1990.",
    imageURL: "string",
  }

  return mockProductData;
}
