'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import Image from 'next/image';
import wristWatch from '@/../public/wrist-watch.png';
import trash from '@/../public/trash.png';

// Tmp Product
const productsTmp = [
  {
    id: '67a90eaad342af0becec6b71',
    name: 'wrist watch 1',
    price: 1000,
    image: wristWatch,
  },
  {
    id: '67a90eaad342af0becec6b72',
    name: 'wrist watch 2',
    price: 2000,
    image: wristWatch,
  },
  {
    id: '67a90eaad342af0becec6b73',
    name: 'wrist watch 3',
    price: 3000,
    image: wristWatch,
  },
];
// Tmp Product

export default function ProductOnDisplay() {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [products, setProducts] = useState<
    { id: string; name: string; price: number; image: string }[]
  >([]);

  /*useEffect(() => {
    if (user?.userType === 'seller') {
      const getProduct = async () => {
        const products = await getSellerProducts(); // Waiting for API
        setProducts(products ?? { id: "", name: "", price: 0, image: "" });
      };
      getProduct();
    }
  }, []);*/

  /*const onDelete = async (productID: string) => {
    const status = await deleteProduct(productID); // Waiting for API
    if (status) {
      toast?.setToast('success', 'Delete product succeeded');
      router.refresh();
    } else {
      toast?.setToast('error', 'Delete product failed');
      router.refresh();
    }
  };*/

  // Tmp OnDelete
  const onDelete = async (productID: string) => {
    toast?.setToast('success', 'Product deleted successfully!');
    router.refresh();
  };
  // Tmp OnDelete

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
        <p className="text-gray-400">My Account</p>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Profile</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={3} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold pb-4">Product on-display</h1>
          {/*Product Table*/}
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
                {productsTmp.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 flex items-center space-x-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">${product.price}</td>
                    <td className="p-3 items-center">
                      <button
                        onClick={() => onDelete(product.id)}
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
