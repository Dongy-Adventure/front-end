import { useToast } from '@/context/ToastContext';
import { Product } from '@/types/product';
import { createOrder } from '@/utils/order';
import { useRouter } from 'next/navigation';

function Summary({ total, products }: { total: number; products: Product[] }) {
  const toast = useToast();
  const router = useRouter();
  const postOrder = async (products: Product[]) => {
    const res = await createOrder(products);
    if (res) {
      toast?.setToast('success', 'Your order has been created!');
      router.push('/buyer/summary');
    } else {
      toast?.setToast('error', 'Sorry! Please try again later');
    }
  };
  return (
    <section className="border-1 bg-gray-100 w-96 h-60 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h1 className="font-bold">Your Order</h1>
        <div className="flex justify-between">
          <h1>Total</h1>
          <h1>${total}</h1>
        </div>
      </div>
      <button
        className="bg-project-primary w-72 rounded-lg h-8 text-white font-bold"
        onClick={() => postOrder(products)}
      >
        Check out
      </button>
    </section>
  );
}

export default Summary;
