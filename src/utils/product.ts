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
  tag: string[],
  amount: number
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
        amount: amount,
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
        amount: p.amount,
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

    if (!productData) {
      return [];
    }

    const products: Product[] = productData.map((p: ProductDataDTO) => {
      return {
        amount: p.amount,
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

export const updateProduct = async (
  pid: string,
  color: string,
  name: string,
  desc: string,
  price: number,
  tag: string[],
  amount: number
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    return false;
  }

  try {
    const res = await apiClient.put(
      `/product/${pid}`,
      {
        amount: amount,
        productName: name,
        productID: pid,
        tag: tag,
        color: color,
        price: price,
        description: desc,
        sellerID: userId,
        imageURL: '',
        createdAt: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
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
