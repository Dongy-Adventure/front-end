'use client';

import Image from 'next/image';
import tempProductImage from '@/../public/placeholder200.avif';
import trash from '@/../public/trash.png';
import { Product } from '@/types/product';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CartCardProps {
  product: Product;
  selected: string[];
  toggleSelect: (id: string) => void;
}

function CartCard(props: CartCardProps) {
  const { product, selected, toggleSelect } = props;
  const [count, setCount] = useState<number>(1);

  return (
    <tr
      key={product.productID}
      className={cn(
        !selected.includes(product.productID) && 'hover:bg-gray-50',
        selected.includes(product.productID) && 'bg-project-secondary'
      )}
    >
      <td>
        <input
          type="checkbox"
          checked={selected.includes(product.productID)}
          onChange={() => toggleSelect(product.productID)}
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
            onClick={() => setCount((prev) => Math.max(1, prev - 1))}
          >
            -
          </button>
          <span className="w-1/3 text-center text-lg">{count}</span>
          <button
            className="w-1/3 h-full flex items-center justify-center text-lg text-gray-700 hover:bg-gray-200"
            onClick={() => setCount((prev) => prev + 1)}
          >
            +
          </button>
        </div>
      </td>
      <td>${product.price}</td>
      <td className="p-3 items-center">
        <button className="items-canter">
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
