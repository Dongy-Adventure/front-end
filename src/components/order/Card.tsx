// import { cn } from '@/lib/utils';
// import Image from 'next/image';
// import WristWatch from '@/../public/wrist-watch.png';
// import { Product } from '@/types/product';

// interface CardProps {
//   orderId: string;
//   orderDate: string;
//   price: number;
//   status: number;
//   products: Product[];
//   setState: (n: number) => void;
//   setOrder: () => void;
// }

// export default function Card(props: CardProps) {
//   const { orderId, orderDate, price, status, products, setState, setOrder } =
//     props;
//   return (
//     <div
//       className={cn(
//         'w-72 h-32 my-2 p-2 rounded-xl flex flex-col',
//         status === 0
//           ? 'bg-project-lightpink'
//           : status === 1
//             ? 'bg-project-lightblue'
//             : status === 2
//               ? 'bg-project-brown'
//               : 'bg-project-lightgreen'
//       )}
//     >
//       <section className="p-2 gap-2">
//         <div className="flex justify-between font-medium text-sm">
//           <h4>Order</h4>
//           <h4>#{orderId}</h4>
//         </div>
//         <div className="flex justify-between font-bold text-md">
//           <h4>{new Date(orderDate).toLocaleDateString('en-GB')}</h4>
//           <h4>${price}</h4>
//         </div>
//         <div className="flex justify-between font-bold text-md pt-1">
//           <div className="grid grid-cols-3">
//             {products.map((p: Product) => {
//               return (
//                 <Image
//                   key={p.productID}
//                   src={WristWatch}
//                   alt={orderId}
//                   className="w-12 h-12 object-cover rounded-md"
//                 />
//               );
//             })}
//           </div>
//           <div className="flex flex-col gap-2">
//             {status === 1 && (
//               <button className="bg-white w-14 h-6 text-sm rounded-md text-project-seablue">
//                 Add
//               </button>
//             )}
//             {status === 2 && (
//               <button className="bg-white w-14 h-6 text-sm rounded-md text-project-orange">
//                 Edit
//               </button>
//             )}
//             <button
//               className={cn(
//                 'bg-white w-14 h-6 text-sm rounded-md',
//                 status === 0
//                   ? 'text-project-pinkred'
//                   : status === 1
//                     ? 'text-project-seablue'
//                     : status === 2
//                       ? 'text-project-orange'
//                       : 'text-project-forest'
//               )}
//               onClick={() => {
//                 setState(status);
//                 setOrder();
//               }}
//             >
//               View
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { cn } from '@/lib/utils';
import Image from 'next/image';
import WristWatch from '@/../public/wrist-watch.png';
import Popup from './Popup';
import { useState } from 'react';
import { Product } from '@/types/product';
import { changeOrderStatus } from '@/utils/order';
import { Order } from '@/types/order';

export interface CardProps {
  order: Order;
  price: number;
  status: number;
  products: Product[];
  setOrder: () => void;
}

export default function Card(props: CardProps) {
  const { order, price, products, status } = props;
  const [loadView, setLoadView] = useState(false);
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className={cn(
        'w-72 h-32 my-2 p-2 rounded-xl flex flex-col',
        status === 0
          ? 'bg-project-lightpink'
          : status === 1
            ? 'bg-project-lightblue'
            : status === 2
              ? 'bg-project-brown'
              : 'bg-project-lightgreen'
      )}
    >
      {loadView && (
        <div
          className={`absolute top-0 right-0 w-screen h-screen backdrop-blur-[3px] flex justify-center items-center ${hidden ? '-z-40' : 'z-40'}`}
          onClick={() => {
            setHidden(true);
          }}
        >
          <Popup {...props} />
        </div>
      )}

      <section className="p-2 gap-2">
        <div className="flex justify-between font-medium text-sm">
          <h4>Order</h4>
          <h4>#{order.orderID}</h4>
        </div>
        <div className="flex justify-between font-bold text-md">
          <h4>{new Date(order.createdAt).toLocaleDateString('en-GB')}</h4>
          <h4>${price}</h4>
        </div>
        <div className="flex justify-between font-bold text-md pt-1">
          <div className="grid grid-cols-3">
            {products.map((p: Product) => {
              return (
                <Image
                  key={p.productID}
                  src={WristWatch}
                  alt={order.orderID}
                  className="w-12 h-12 object-cover rounded-md"
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <button
              className={cn(
                'w-14 h-6 text-sm rounded-md bg-white invisible',
                status === 0
                  ? 'text-project-pinkred'
                  : status === 1
                    ? 'text-project-seablue'
                    : status === 2
                      ? 'text-project-orange'
                      : 'text-project-forest'
              )}
            >
              Add
            </button>

            <button
              className={cn(
                'bg-white w-14 h-6 text-sm rounded-md',
                status === 0
                  ? 'text-project-pinkred'
                  : status === 1
                    ? 'text-project-seablue'
                    : status === 2
                      ? 'text-project-orange'
                      : 'text-project-forest'
              )}
              onClick={() => {
                setLoadView(true);
                setHidden(false);
              }}
            >
              {status === 3 ? 'View' : 'Edit'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
