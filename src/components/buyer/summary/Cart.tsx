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
      <td className="py-3 flex flex-col justify-center">
        <Image
          src={product.image}
          width={40}
          height={40}
          sizes="m"
          alt={product.productName}
          className="object-cover rounded-md aspect-square max-h-16 max-w-16"
        />
        <span className="pl-3">{product.productName}</span>
      </td>
      <td className="py-3 items-center">฿{product.price.toFixed(2)}</td>
      <td className="py-3 items-center">
        <div className="flex items-center justify-center w-16 h-6">
          <span className="w-1/3 text-center text-lg">{amount}</span>
        </div>
      </td>
      <td className="py-3 items-center">
        ฿{(product.price * amount).toFixed(2)}
      </td>
    </tr>
  );
}

export default Card;
