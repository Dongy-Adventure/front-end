'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import Image from 'next/image';
import wristWatch from '@/../public/wrist-watch.png';
import trash from '@/../public/trash.png';
import { deleteProduct, getSellerProducts } from '@/utils/product';
import { Product } from '@/types/product';
import AddProduct from '@/components/seller/product/AddProduct';
import { Icon } from '@iconify/react/dist/iconify.js';
import EditProduct from '@/components/seller/product/EditProduct';

export default function ProductOnDisplay() {
  const toast = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [onProductPage, setOnProductPage] = useState<boolean>(false);
  const [onEditPage, setOnEditPage] = useState<boolean>(false);
  const [selectedEdit, setSelectedEdit] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      const products: Product[] | null = await getSellerProducts();
      setProducts(products ?? []);
    };
    getProduct();
  }, []);

  const onDelete = async (productID: string) => {
    const success = await deleteProduct(productID);
    if (success) {
      toast?.setToast('success', 'Product deleted successfully!');
      setProducts(products.filter((p: Product) => p.productID !== productID));
    } else {
      toast?.setToast(
        'error',
        'There is an error occurred! Please try again later.'
      );
    }
  };

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      {onProductPage && <AddProduct closing={() => setOnProductPage(false)} />}
      {onEditPage && (
        <EditProduct
          productDescription={selectedEdit?.description ?? ''}
          productName={selectedEdit?.productName ?? ''}
          productId={selectedEdit?.productID ?? ''}
          price={selectedEdit?.price ?? 0}
          color={selectedEdit?.color ?? ''}
          tag={selectedEdit?.tag ?? []}
          amount={selectedEdit?.amount ?? 1}
          closing={() => setOnEditPage(false)}
        />
      )}
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Product On Display</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={3} />
        <div className="flex flex-col w-full">
          <div className="flex justify-between pr-12">
            <h1 className="text-xl font-bold">Product on-display</h1>
            <button
              className="bg-project-primary text-white p-2 px-4 font-bold rounded-xl hover:bg-project-dark"
              onClick={() => setOnProductPage(true)}
            >
              + Add new product
            </button>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Product</th>
                  <th>Product ID</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {products.map((product: Product) => (
                  <tr
                    key={product.productID}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 flex items-center space-x-3">
                      <Image
                        src={wristWatch}
                        alt={product.productName}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <span>{product.productName}</span>
                    </td>
                    <td className="p-3">{product.productID}</td>
                    <td className="p-3">{product.amount}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3 items-center">
                      <button
                        className="px-1"
                        onClick={() => {
                          setOnEditPage(true);
                          setSelectedEdit(product);
                        }}
                      >
                        <Icon
                          icon="pepicons-pencil:color-picker"
                          className="w-5 h-5"
                        />
                      </button>
                      <button
                        onClick={() => onDelete(product.productID)}
                        className="items-center"
                      >
                        <Image
                          src={trash}
                          alt="Delete"
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
