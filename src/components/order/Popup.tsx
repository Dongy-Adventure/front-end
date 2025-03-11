import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CardProps } from './Card';
import Appointment from './Appointment';

export default function Popup(prop: CardProps) {
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
    2: 'text-project-brown',
    3: 'text-project-lightgreen',
  };
  return (
    <div className="w-fit h-[800px] bg-white rounded-2xl flex flex-row shadow-2xl">
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
        <div className="w-full h-fit flex flex-col gap-2 justify-center">
            <div className="flex justify-center gap-1 h-[35px] shadow-lg">
                <div className="flex shadow-md font-[15px] color-[#485966] items-center justify-center h-[25px] w-full">
                    <div className="ml-4">Product</div>
                    <div className="ml-auto mr-4">Quantity</div>
                </div>
                <div className="">

                </div>
            </div>
        </div>
      </div>
      {/* right */}
      <Appointment/>
    </div>
  );
}
