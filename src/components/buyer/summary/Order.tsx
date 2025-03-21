import { useToast } from '@/context/ToastContext';
import { Product } from '@/types/product';

const paymentOptions = [
  { id: 'Promptpay', label: 'PromptPay' },
  { id: 'Debit', label: 'Debit Card' },
  { id: 'Credit', label: 'Credit Card' },
  { id: 'Cash', label: 'Pay On Cash' },
];

function Order({
  total,
  handleSubmit,
  products,
  payBy,
  setPayBy,
}: {
  total: number;
  handleSubmit: (products: Product[], paymentMethod: string) => void;
  products: Product[];
  payBy: string;
  setPayBy: (s: string) => void;
}) {
  const toast = useToast();
  return (
    <section className="border bg-gray-100 w-96 h-72 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-lg">Your Order</h1>
        <h2 className="mt-2">Payment Method</h2>
        <div className="flex flex-col gap-2 mt-2">
          {paymentOptions.map((option) => (
            <label
              key={option.id}
              className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer ${
                payBy === option.id ? 'bg-blue-100 border-blue-500' : ''
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={option.id}
                checked={payBy === option.id}
                onChange={() => setPayBy(option.id)}
                className="hidden"
              />
              <span className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                {payBy === option.id && (
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                )}
              </span>
              {option.label}
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <h2 className="font-semibold">Total</h2>
          <h2 className="font-semibold">${total.toFixed(2)}</h2>
        </div>
      </div>
      <button
        className={`w-full rounded-lg h-10 text-white font-bold mt-4 ${
          payBy
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!payBy}
        onClick={() => {
          if (payBy) handleSubmit(products, payBy);
          else toast?.setToast('error', 'Please add payment method');
        }}
      >
        Place Order
      </button>
    </section>
  );
}

export default Order;
