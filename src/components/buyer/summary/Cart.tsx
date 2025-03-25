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
      <td className="py-3 items-center">
        <Image
          src={tempProductImage}
          alt={product.productName}
          className="w-12 h-12 object-cover rounded-md"
        />
        <span className="items-center">{product.productName}</span>
      </td>
      <td className="py-3 items-center">฿{(product.price).toFixed(2)}</td>
      <td className="py-3 items-center">
        <div className="flex items-center justify-center w-16 h-6">
          <span className="w-1/3 text-center text-lg">{amount}</span>
        </div>
      </td>
      <td className="py-3 items-center">฿{(product.price * amount).toFixed(2)}</td>
    </tr>
  );
}

export default Card;
