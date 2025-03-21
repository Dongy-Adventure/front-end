'use client';

import Image from 'next/image';
import tempProductImage from '@/../public/placeholder200.jpeg';
import trash from '@/../public/trash.png';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CartCardProps {
  product: Product;
  total: number;
  handleDelete: (pid: string) => void;
}

function CartCard(props: CartCardProps) {
  const { toggleChanges, selectedItemCart, setAmountCart } = useCart();
  const { product, total, handleDelete } = props;
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    setCount(total);
  }, []);

  return (
    <tr
      key={product.productID}
      className={cn(
        !selectedItemCart.includes(product.productID) && 'hover:bg-gray-50',
        selectedItemCart.includes(product.productID) && 'bg-project-secondary'
      )}
    >
      <td>
        <input
          type="checkbox"
          checked={selectedItemCart.includes(product.productID)}
          onChange={() => toggleChanges(product.productID)}
          className="w-5 h-5 text-purple-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
        />
      </td>
      <td className="p-3 flex items-center space-x-3">
        <Image
          src={tempProductImage}
          alt={product.productName}
          className="w-12 h-12 object-cover rounded-md"
        />
        <span>{product.productName}</span>
      </td>
      <td className="p-3">${product.price}</td>
      <td>
        <div className="flex items-center justify-between w-16 h-6 border rounded-lg bg-gray-100">
          <button
            className="w-1/3 h-full flex items-center justify-center text-lg text-gray-700 hover:bg-gray-200"
            onClick={() => {
              setCount((prev) => Math.max(1, prev - 1));
              setAmountCart(product.productID, -1);
            }}
          >
            -
          </button>
          <span className="w-1/3 text-center text-lg">{count}</span>
          <button
            className="w-1/3 h-full flex items-center justify-center text-lg text-gray-700 hover:bg-gray-200"
            onClick={() => {
              setCount((prev) => Math.min(prev + 1, product.amount));
              setAmountCart(product.productID, 1);
            }}
          >
            +
          </button>
        </div>
      </td>
      <td>${(product.price * count).toFixed(2)}</td>
      <td className="p-3 items-center">
        <button
          className="items-center"
          onClick={() => handleDelete(product.productID)}
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
  );
}

export default CartCard;
