import { cn } from '@/lib/utils';
import Image from 'next/image';
import WristWatch from '@/../public/wrist-watch.png';
import Popup from './Popup';
import { useEffect, useState } from 'react';
import { Order, OrderCart } from '@/types/order';
import { getProductById } from '@/utils/product';
import { Product } from '@/types/product';

export interface CardProps {
  order: Order;
  price: number;
  products: OrderCart[];
  setOrder: () => void;
}

export default function Card(props: CardProps) {
  const { order, price, products } = props;
  const [hidden, setHidden] = useState(false);
  const [prods, setProds] = useState<Product[]>([]);

  useEffect(() => {
    const fetchAllProds = async () => {
      let prodArr: Product[] = [];

      for (let p of products) {
        const prod = await getProductById(p.productID);
        if (prod) {
          prodArr.push(prod);
        }
      }
      setProds(prodArr);
    };

    fetchAllProds();
  }, []);

  return (
    <div
      className={cn(
        'w-72 h-32 my-2 p-2 rounded-xl flex flex-col',
        order.status === 0
          ? 'bg-project-lightpink'
          : order.status === 1
            ? 'bg-project-lightblue'
            : order.status === 2
              ? 'bg-project-brown'
              : 'bg-project-lightgreen'
      )}
    >
      <div
        className={cn(
          'absolute top-0 py-12 right-0 w-screen h-screen backdrop-blur-[3px] flex justify-center items-center',
          !hidden ? 'hidden' : 'z-40'
        )}
        data-testid="visibility"
        onClick={() => {
          setHidden(false);
        }}
      >
        <Popup {...props} />
      </div>

      <section className="p-2 gap-2">
        <div className="flex justify-between font-medium text-sm">
          <h4>Order</h4>
          <h4>#{order.orderID}</h4>
        </div>
        <div className="flex justify-between font-bold text-md">
          <h4>{new Date(order.createdAt).toLocaleDateString('en-GB')}</h4>
          <h4>฿{price}</h4>
        </div>
        <div className="flex justify-between font-bold text-md pt-1">
          <div className="grid grid-cols-3">
            {products.map((p: OrderCart) => {
              const pp = prods.find((pd) => pd.productID === p.productID);
              return (
                <Image
                  key={p.productID}
                  src={pp?.image ?? WristWatch}
                  width={50}
                  height={50}
                  sizes="m"
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
                order.status === 0
                  ? 'text-project-pinkred'
                  : order.status === 1
                    ? 'text-project-seablue'
                    : order.status === 2
                      ? 'text-project-orange'
                      : 'text-project-forest'
              )}
            >
              Add
            </button>

            <button
              className={cn(
                'bg-white w-14 h-6 text-sm rounded-md',
                order.status === 0
                  ? 'text-project-pinkred'
                  : order.status === 1
                    ? 'text-project-seablue'
                    : order.status === 2
                      ? 'text-project-orange'
                      : 'text-project-forest'
              )}
              onClick={() => {
                setHidden(true);
              }}
            >
              {order.status === 3 ? 'View' : 'Edit'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
