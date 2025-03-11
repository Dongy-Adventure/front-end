'use client';

import Image from 'next/image';
import tempProductImage from '@/../public/placeholder200.jpeg';
import { Product } from '@/types/product';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CardProps {
  product: Product;
}

function Card(props: CardProps) {
  const { product } = props;
  const { selectedItemCart } = useCart();
  const [count, setCount] = useState<number>(1);

  return (
    <tr
      key={product.productID}
      className={cn(
        !selectedItemCart.includes(product.productID) && 'hover:bg-gray-50',
        selectedItemCart.includes(product.productID) && 'bg-project-secondary'
      )}
    >
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
        <div className="flex items-center justify-center w-16 h-6">
          <span className="w-1/3 text-center text-lg">{count}</span>
        </div>
      </td>
      <td>${product.price}</td>
    </tr>
  );
}

export default Card;
