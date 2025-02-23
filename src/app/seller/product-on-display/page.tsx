'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import Image from 'next/image';
import wristWatch from '@/../public/wrist-watch.png';
import trash from '@/../public/trash.png';
import { getSellerProducts } from '@/utils/product';
import { Product } from '@/types/product';

export default function ProductOnDisplay() {
  const toast = useToast();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProduct = async () => {
      const products: Product[] | null = await getSellerProducts();
      setProducts(products ?? []);
    };
    getProduct();
  }, []);

  const onDelete = async (productID: string) => {
    toast?.setToast('success', 'Product deleted successfully!');
    router.refresh();
  };

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
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
        <Sidebar state={4} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold pb-4">Product on-display</h1>
          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Product</th>
                  <th>Product ID</th>
                  <th>Total</th>
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
                    <td className="p-3">${product.price}</td>
                    <td className="p-3 items-center">
                      <button
                        onClick={() => onDelete(product.productName)}
                        className="items-canter"
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
          {/*Product Table*/}
        </div>
      </div>
    </div>
  );
}
