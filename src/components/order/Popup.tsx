// import Image from 'next/image';
// import { cn } from '@/lib/utils';
import { CardProps } from './Card';
import Appointment from './Appointment';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/product';
import { Order } from '@/types/order';
import Review from './Review';
import { getUser } from '@/utils/user';

export default function Popup(prop: CardProps) {
  interface Product {
    amount: number;
    color: string;
    createdAt: string;
    description: string;
    imageURL: string;
    price: number;
    productID: string;
    productName: string;
    sellerID: string;
    tag: string[];
  }

  interface Order {
    buyerID: string;
    products: Product[];
    sellerID: string;
  }
  const mockOrder: Order = {
    buyerID: '6531314921',
    products: [
      {
        amount: 2,
        color: 'Midnight Black',
        createdAt: '2025-03-12T10:00:00Z',
        description:
          'A high-end smartphone with an amazing camera and long battery life.',
        imageURL: '@/../public/wrist-watch.png',
        price: 999.99,
        productID: 'prod12345',
        productName: 'Smartphone Pro Max',
        sellerID: 'seller001',
        tag: ['electronics', 'smartphone', 'technology'],
      },
      {
        amount: 1,
        color: 'Silver',
        createdAt: '2025-03-12T10:30:00Z',
        description: 'Noise-canceling wireless headphones with a sleek design.',
        imageURL: '@/../public/wrist-watch.png',
        price: 199.99,
        productID: 'prod67890',
        productName: 'Wireless Headphones',
        sellerID: 'seller002',
        tag: ['audio', 'headphones', 'wireless'],
      },
      {
        amount: 3,
        color: 'Ocean Blue',
        createdAt: '2025-03-12T11:00:00Z',
        description: 'Portable Bluetooth speaker with excellent sound quality.',
        imageURL: '@/../public/wrist-watch.png',
        price: 89.99,
        productID: 'prod11121',
        productName: 'Bluetooth Speaker',
        sellerID: 'seller003',
        tag: ['audio', 'speaker', 'portable'],
      },
      {
        amount: 3,
        color: 'Ocean Blue',
        createdAt: '2025-03-12T11:00:00Z',
        description: 'Portable Bluetooth speaker with excellent sound quality.',
        imageURL: '@/../public/wrist-watch.png',
        price: 89.99,
        productID: 'prod11121',
        productName: 'Bluetooth Speaker',
        sellerID: 'seller003',
        tag: ['audio', 'speaker', 'portable'],
      },
      {
        amount: 3,
        color: 'Ocean Blue',
        createdAt: '2025-03-12T11:00:00Z',
        description: 'Portable Bluetooth speaker with excellent sound quality.',
        imageURL: '@/../public/wrist-watch.png',
        price: 89.99,
        productID: 'prod11121',
        productName: 'Bluetooth Speaker',
        sellerID: 'seller003',
        tag: ['audio', 'speaker', 'portable'],
      },
      {
        amount: 3,
        color: 'Ocean Blue',
        createdAt: '2025-03-12T11:00:00Z',
        description: 'Portable Bluetooth speaker with excellent sound quality.',
        imageURL: '@/../public/wrist-watch.png',
        price: 89.99,
        productID: 'prod11121',
        productName: 'Bluetooth Speaker',
        sellerID: 'seller003',
        tag: ['audio', 'speaker', 'portable'],
      },
    ],
    sellerID: 'seller000',
  };
  const { user } = useAuth();

  const status: { [key: number]: string } = {
    0: 'Pending payment',
    1: 'Add appointment',
    2: 'Edit appointment',
    3: 'Completed',
  };

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
    3: 'text-project-lightgreen',
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // Prevent parent from triggering
      }}
      className="w-fit h-[800px] bg-white rounded-2xl flex flex-col lg:flex-row shadow-2xl z-40"
    >
      {/* left */}
      <div
        className={`w-[500px] gap-5 h-full flex flex-col p-[30px] rounded-2xl items-center `}
      >
        <div
          className={`w-full h-[105px] relative rounded-xl ${BgColorCode[prop.status]}`}
        >
          <div
            className={`bg-white  flex h-[20px] rounded-[8px] w-fit font-bold px-5 justify-center items-center absolute top-3 right-3 ${textColor[prop.status]}`}
          >
            {status[prop.status]}
          </div>
          <div className="w-fit h-fit font-bold text-[24px] absolute left-[20px] bottom-[12px]">
            Order #{prop.orderId}
          </div>
        </div>
        <div className="w-full h-fit grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 w-fit">
            <div className="text-[16px] font-normal">Order Date</div>
            <div className="text-[16px] font-bold">{prop.orderDate}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-normal">Buyer</div>
            <div className="text-[16px] font-bold"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[16px] font-normal">Payment Method</div>
            <div className="text-[16px] font-bold">ddd</div>
          </div>
          <div className="flex flex-col gap-1 w-fit">
            <div className="text-[16px] font-normal">Total</div>
            <div className="text-[16px] font-bold">$price</div>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-2 justify-center ">
          <div className="flex shadow-md font-[15px] h-[40px] color-[#485966] items-center justify-center w-full">
            <div className="ml-4">Product</div>
            <div className="ml-auto mr-4">Quantity</div>
          </div>
          <div className="flex flex-col w-full overflow-y-scroll h-[350px] gap-3">
            {mockOrder.products.map((product: Product) => (
              <div
                className="flex relative items-center min-h-[85px] w-full gap-3 shadow-md rounded-xl"
                key={product.productID}
              >
                <img
                  src={product.imageURL}
                  className="h-[50px] min-w-[50px] mx-4 mt-auto mr-auto"
                />
                <div className="text-[14px]  absolute mt-auto mr-auto left-[80px] font-normal">
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
      {prop.status < 3 && <Appointment {...prop} />}
      {prop.status === 3 && user?.userType === 'buyer' && <Review {...prop} />}
    </div>
  );
}
