'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import CartCard from '@/components/buyer/cart/CartCard';
import { Product } from '@/types/product';
import Summary from '@/components/buyer/cart/Summary';

const cartDummy: Product[] = [
  {
    sellerID: '67b4339751e8c7239bd7fed3',
    color: 'Red',
    createdAt: '2025-02-19T10:00:00Z',
    description: 'A stylish red smartwatch with fitness tracking features.',
    imageURL: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Smartwatch',
    price: 199.99,
    productID: '67b5eb0af5abcd4d04b24c02',
    productName: 'Smartwatch Pro',
    tag: ['wearable', 'tech', 'fitness'],
  },
  {
    sellerID: '67b4339751e8c7239bd7fed3',
    color: 'Blue',
    createdAt: '2025-02-18T15:30:00Z',
    description: 'Noise-canceling over-ear headphones with deep bass.',
    imageURL: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
    price: 129.99,
    productID: '67b5ec35f5abcd4d04b24c03',
    productName: 'Bass Boost Headphones',
    tag: ['audio', 'music', 'wireless'],
  },
  {
    sellerID: '67b4339751e8c7239bd7fed3',
    color: 'Black',
    createdAt: '2025-02-17T08:45:00Z',
    description: 'Ultra-lightweight gaming mouse with customizable RGB.',
    imageURL: 'https://via.placeholder.com/150/000000/FFFFFF?text=Mouse',
    price: 79.99,
    productID: '67b6cff3db3f34883d64d7bb',
    productName: 'RGB Gaming Mouse',
    tag: ['gaming', 'pc', 'accessory'],
  },
  {
    sellerID: '67b4339751e8c7239bd7fed3',
    color: 'White',
    createdAt: '2025-02-16T20:15:00Z',
    description: 'Sleek mechanical keyboard with customizable key switches.',
    imageURL: 'https://via.placeholder.com/150/FFFFFF/000000?text=Keyboard',
    price: 149.99,
    productID: '67b6d004db3f34883d64d7bc',
    productName: 'Mechanical Keyboard X',
    tag: ['keyboard', 'mechanical', 'gaming'],
  },
];
export default function Cart() {
  const toast = useToast();
  const router = useRouter();
  const [carts, setCarts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // const getProduct = async () => {
    //   const products = await getSellerProducts();
    //   setProducts(products ?? []);
    // };
    setCarts(cartDummy);
  }, []);

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
        <p className="text-black font-semibold">Cart</p>
      </div>
      <div className="flex gap-16 text-black">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold pb-4 text-project-primary">Cart</h1>
          <main className="overflow-x-auto p-8 flex gap-8">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Status</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {carts.map((cart: Product) => (
                  <CartCard
                    key={cart.productID}
                    product={cart}
                    selected={selected}
                    toggleSelect={toggleSelect}
                  />
                ))}
              </tbody>
            </table>
            <Summary
              total={cartDummy
                .filter((product) => selected.includes(product.productID))
                .reduce((sum, product) => sum + product.price, 0)}
              products={carts.filter((product) =>
                selected.includes(product.productID)
              )}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
