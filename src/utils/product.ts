import { getAccessToken } from './auth';
import { AxiosResponse } from 'axios';
import { ProductDataDTO, ProductDTO, ProductsDTO } from '@/dtos/productDTO';
import { apiClient } from './axios';
import { Product } from '@/types/product';
import { getUserId } from './user';

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

export const getProductById = async (pid: string): Promise<Product | null> => {
  try {
    const res: AxiosResponse<ProductDTO> = await apiClient.get(
      `/product/${pid}`
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getSellerProducts = async (): Promise<Product[] | null> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    const res: AxiosResponse<ProductsDTO> = await apiClient.get(
      `/product/seller/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    const productData: ProductDataDTO[] = res.data.data;

    if (!productData) return [];
    const products: Product[] = productData.map((p: ProductDataDTO) => {
      return {
        sellerID: p.sellerID,
        color: p.color,
        createdAt: p.createdAt,
        description: p.description,
        imageURL: p.imageURL,
        price: p.price,
        productID: p.productID,
        productName: p.productName,
        tag: p.tag,
      };
    });

    return products;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllProducts = async (): Promise<Product[] | null> => {
  try {
    const res: AxiosResponse<ProductsDTO> = await apiClient.get(`/product/`);

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    const productData: ProductDataDTO[] = res.data.data;

    const products: Product[] = productData.map((p: ProductDataDTO) => {
      return {
        sellerID: p.sellerID,
        color: p.color,
        createdAt: p.createdAt,
        description: p.description,
        imageURL: p.imageURL,
        price: p.price,
        productID: p.productID,
        productName: p.productName,
        tag: p.tag,
      };
    });

    return products;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteProduct = async (pid: string): Promise<boolean> => {
  try {
    const res = await apiClient.delete(`/product/${pid}`);

    if (!res.data.success) {
      console.error(res.data.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
