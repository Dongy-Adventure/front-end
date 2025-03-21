'use client';

import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import CartCard from '@/components/buyer/cart/CartCard';
import Summary from '@/components/buyer/cart/Summary';
import { deleteCart, updateCart } from '@/utils/buyer';
import { ItemCart, useCart } from '@/context/CartContext';

export default function Cart() {
  const { cart, selectedItemCart } = useCart();
  const toast = useToast();

  const deleteItem = async (pid: string) => {
    const res = await deleteCart(pid);

    if (res) {
      toast?.setToast('success', 'Item removed from cart successfully!');
      window.location.href = '/buyer/cart';
    } else {
      toast?.setToast('error', 'An error occurred. Please try again later.');
    }
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
                {cart.map((cart: ItemCart) => (
                  <CartCard
                    product={cart.product}
                    handleDelete={deleteItem}
                    total={cart.amount}
                    key={cart.product.productID}
                  />
                ))}
              </tbody>
            </table>
            <Summary
              total={cart
                .filter((c) => selectedItemCart.includes(c.product.productID))
                .reduce((sum, c) => sum + c.product.price * c.amount, 0)}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
