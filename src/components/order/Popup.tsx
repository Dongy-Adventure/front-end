// import Image from 'next/image';
// import { cn } from '@/lib/utils';
import { CardProps } from './Card';
import Appointment from './Appointment';
import WristWatch from '@/../public/wrist-watch.png';
import Image from 'next/image';
import Review from './Review';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { getProductById } from '@/utils/product';

export const status: { [key: number]: string } = {
  0: 'Waiting For Seller',
  1: 'Waiting For Buyer',
  2: 'Waiting For Delivery',
  3: 'Completed',
};

export default function Popup(prop: CardProps) {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const p: Product[] = [];
      for (const orderCart of prop.order.products) {
        const res = await getProductById(orderCart.productID);
        if (res) {
          p.push(res);
        }
      }
      setProducts(p);
    };

    fetchProducts();
  }, []);

  const BgColorCode: { [key: number]: string } = {
    0: 'bg-project-lightpink border-project-lightpink',
    1: 'bg-project-lightblue border-project-lightblue',
    2: 'bg-project-brown border-project-brown',
    3: 'bg-project-lightgreen border-project-lightgreen',
  };
  const textColor: { [key: number]: string } = {
    0: 'text-[#F33CB4]',
    1: 'text-project-lightblue',
    2: 'text-[#CC731B]',
    3: 'text-project-green',
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="w-fit h-[800px] bg-white rounded-2xl flex flex-col lg:flex-row shadow-2xl z-40"
    >
      <div
        className={`w-[500px] gap-5 h-full flex flex-col p-[30px] rounded-2xl items-center `}
      >
        <div
          className={cn(
            'w-full h-[105px] relative rounded-xl',
            BgColorCode[prop.order.status]
          )}
        >
          <div
            className={cn(
              'bg-white  flex h-[20px] rounded-[8px] w-fit font-bold px-5 justify-center items-center absolute top-3 right-3',
              textColor[prop.order.status]
            )}
          >
            {status[prop.order.status]}
          </div>
          <div className="w-fit h-fit font-bold text-[24px] absolute left-[20px] bottom-[12px]">
            Order #{prop.order.orderID}
          </div>
        </div>
        <div className="w-full h-fit grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 w-fit">
            <div className="text-[16px] font-normal">Order Date</div>
            <div className="text-[16px] font-bold">
              {prop.order.createdAt.slice(0, 10)}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-normal">
              {user?.userType === 'seller' ? 'Buyer' : 'Seller'}
            </div>
            <div className="text-[16px] font-bold">
              {user?.userType === 'seller'
                ? prop.order.buyerName
                : prop.order.sellerName}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-normal">Payment Method</div>
            <div className="text-[16px] font-bold">{prop.order.payment}</div>
          </div>
          <div className="flex flex-col gap-1 w-fit">
            <div className="text-[16px] font-normal">Total</div>
            <div className="text-[16px] font-bold">
              ${prop.order.totalPrice}
            </div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2 justify-center ">
          <div className="flex shadow-md font-[15px] h-[40px] color-[#485966] items-center border rounded-xl justify-center w-full">
            <div className="ml-4">Product</div>
            <div className="ml-auto mr-4">Quantity</div>
          </div>
          <div className="flex flex-col w-full overflow-y-scroll h-[350px] gap-3">
            {products.map((product: Product) => (
              <div
                className="flex relative items-center min-h-[85px] w-full gap-3 shadow-md border rounded-xl"
                key={product.productID}
              >
                <Image
                  src={product.image}
                  width={50}
                  height={50}
                  sizes="m"
                  alt="Dummy"
                  className="absolute w-12 h-12"
                />
                <div className="text-[14px] absolute mt-auto mr-auto left-[80px] font-normal">
                  {product.productName}
                </div>
                <div className="ml-auto mr-12 text-[14px]">
                  {product.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {prop.order.status < 3 && <Appointment {...prop} />}
      {prop.order.status === 3 && user?.userType === 'buyer' && (
        <Review {...prop} />
      )}
    </div>
  );
}
