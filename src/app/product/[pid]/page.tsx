import Link from 'next/link';
import { getProductById } from '@/utils/product';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import placeholder from '@/../public/placeholder2.jpg';
import ProductSellerCard from '@/components/ProductSellerCard';

export default function page({ params }: { params: { pid: string } }) {
  const pid: string = params.pid;
  const product = getProductById(pid);

  return (
    <div className="p-12 pt-16 flex flex-col">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Product Detail</p>
      </div>
      <div className="flex gap-8 w-full flex-col lg:flex-row">
        <div className="bg-black w-96 h-96"></div>
        <div className="flex flex-col w-2/5 max-w-2/5">
          <p className="text-lg md:text-xl lg:text-2xl font-bold pb-12">
            {product.productName}
          </p>
          <div className="flex gap-2 align-text-bottom pb-4">
            <p className="text-lg font-medium">฿{product.price}</p>
            <p className="text-project-green font-light">-78%</p>
          </div>
          <p className="leading-tight font-light pb-8">{product.description}</p>
          <ProductSellerCard sid={product.sellerID} />
        </div>
      </div>
      pid: {params.pid}
    </div>
  );
}
