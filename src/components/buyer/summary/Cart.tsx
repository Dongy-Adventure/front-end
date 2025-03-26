'use client';

import Image from 'next/image';
import tempProductImage from '@/../public/placeholder200.jpeg';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

interface CardProps {
  product: Product;
  amount: number;
}

function Card(props: CardProps) {
  const { product, amount } = props;
  const { selectedItemCart } = useCart();

  return (
    <tr
      key={product.productID}
      className={cn(
        !selectedItemCart.includes(product.productID) && 'hover:bg-gray-50',
        selectedItemCart.includes(product.productID) && 'bg-project-secondary'
      )}
    >
      <td className="flex items-center h-24 space-x-3">
        <Image
          src={tempProductImage}
          alt={product.productName}
          className="object-cover rounded-md aspect-square max-h-16 max-w-16"
        />
        <span>{product.productName}</span>
      </td>
      <td>${product.price}</td>
      <td>
        <div className="flex items-center justify-center w-16 h-6">
          <span className="w-1/3 text-center text-lg">{amount}</span>
        </div>
      </td>
      <td>${product.price * amount}</td>
    </tr>
  );
}

export default Card;
