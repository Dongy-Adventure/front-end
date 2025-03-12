import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

function Order({
  total,
  handleSubmit,
  products,
}: {
  total: number;
  handleSubmit: (products: Product[]) => void;
  products: Product[];
}) {
  const { selectedItemCart } = useCart();

  return (
    <section className="border-1 bg-gray-100 w-96 h-60 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h1 className="font-bold">Your Order</h1>
        <h1>Payment Method</h1>
        <div className="flex justify-between">
          <h1>Total</h1>
          <h1>${total.toFixed(2)}</h1>
        </div>
      </div>
      <button
        className="bg-project-primary w-72 rounded-lg h-8 text-white font-bold"
        onClick={() => {
          handleSubmit(products);
        }}
      >
        Place Order
      </button>
    </section>
  );
}

export default Order;
