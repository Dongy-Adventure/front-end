import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

function Summary({ total }: { total: number }) {
  const toast = useToast();
  const router = useRouter();
  const { selectedItemCart, cart } = useCart();

  return (
    <section className="border-1 bg-gray-100 w-96 h-60 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h1 className="font-bold">Your Order</h1>
        <div className="flex justify-between">
          <h1>Total</h1>
          <h1>฿{total.toFixed(2)}</h1>
        </div>
      </div>
      <button
        className="bg-project-primary rounded-lg h-8 text-white font-bold"
        onClick={() => {
          if (selectedItemCart.length === 0) {
            toast?.setToast(
              'error',
              'Please add at least one item to continue!'
            );
          } else {
            router.push('/buyer/summary');
            localStorage.setItem(
              'selectedProduct',
              JSON.stringify(selectedItemCart)
            );
            localStorage.setItem('cartProduct', JSON.stringify(cart));
          }
        }}
      >
        Check out
      </button>
    </section>
  );
}

export default Summary;
