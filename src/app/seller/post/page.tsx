'use client';

import PostProductForm from '@/components/seller/post/ProductPostingForm';
import { useAuth } from '@/context/AuthContext';
import { Seller } from '@/types/user';
import { Product } from '@/types/product';
import { useState } from 'react';

interface productInfo {
  sellerName: string;
  sellerSurname: string;
  productName: string;
  price: number;
  amount: number;
  description: string;
  productImage: string;
}

// const tempProduct: productInfo = {
//   sellerName: 'Korn',
//   sellerSurname: 'Surapat',
//   productName: 'Amphetamine',
//   price: '5000',
//   amount: '1000',
//   description: 'Kimochiii!!!',
//   productImage: '',
// };

export default function PostProduct() {
  const { user } = useAuth();
  const [product, setProduct] = useState<Product>();

  // const tempProduct: productInfo = {
  //   sellerName: (user as Seller)?.name ?? 'Korn',
  //   sellerSurname: (user as Seller)?.surname ?? 'Surapat',
  //   productName: (product as Product)?.name ?? 'Amphetamine',
  //   price: (product as Product)?.price ?? 5000,
  //   amount: (product as Product)?.amount ?? 1000,
  //   description: (product as Product)?.description ?? 'Kimochiii!!!',
  //   productImage: (product as Product)?.image ?? '',
  // };

  return <PostProductForm />;
}
