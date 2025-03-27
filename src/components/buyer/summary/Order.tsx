import { useToast } from '@/context/ToastContext';
import { CardData } from '@/types/order';
import { Product } from '@/types/product';
import { UseFormReturn } from 'react-hook-form';

const PAYMENTOPTIONS = [
  // { id: 'Debit/Credit', label: 'Debit/Credit Card' },
  { id: 'Cash', label: 'Pay On Delivery' },
];

function Order({
  total,
  handleSubmit,
  products,
  totalAmount,
  cardForm,
  paymentType,
  setPaymentType,
}: {
  total: number;
  handleSubmit: (products: Product[], cardData?: CardData) => void;
  products: Product[];
  totalAmount: number;
  cardForm: UseFormReturn<CardData, any, undefined>;
  paymentType: string;
  setPaymentType: (s: string) => void;
}) {
  const toast = useToast();
  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = cardForm;

  const onSubmit = (data: CardData) => {
    if (paymentType) {
      handleSubmit(products, data);
    } else {
      toast?.setToast('error', 'Please add payment method');
    }
  };

  return (
    <div className="flex gap-4 flex-col w-96">
      <section className="border bg-gray-100 rounded-xl p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold">Payment Method</h1>
          <p>
            Please select the preferred payment method to use on this order.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            {PAYMENTOPTIONS.map((option) => (
              <div key={option.id}>
                <label
                  className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer ${
                    paymentType === option.id
                      ? 'bg-blue-100 border-blue-500'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={option.id}
                    checked={paymentType === option.id}
                    disabled={option.id === 'Debit/Credit' && totalAmount < 20}
                    onChange={() => {
                      setPaymentType(option.id);
                    }}
                    className="hidden"
                  />
                  <span className="w-5 h-5 border border-gray-400 rounded-full flex items-center justify-center">
                    {paymentType === option.id && (
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                  </span>
                  {option.label}
                </label>
                {option.id === 'Debit/Credit' && totalAmount < 20 && (
                  <span className="text-red-500 text-sm">
                    Debit/Credit Card Pay must be more than 20 bath!!
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="border bg-gray-100 rounded-xl p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold">Payment Method</h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={paymentType === 'Cash'}
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={paymentType === 'Cash'}
            {...register('number')}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const rawValue = input.value.replace(/\D/g, ''); // Keep only digits
              const formattedValue = rawValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Format with spaces
              input.value = formattedValue; // Modify only the displayed value
            }}
          />
          {errors.number && (
            <span className="text-red-500 text-sm">
              {errors.number.message}
            </span>
          )}
        </div>

        <div className="flex gap-2 justify-between">
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Expiration Month</label>
            <input
              type="number"
              placeholder="MM"
              className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              min="1"
              max="12"
              step="1"
              disabled={paymentType === 'Cash'}
              {...register('expiryMonth')}
            />
            {errors.expiryMonth && (
              <span className="text-red-500 text-sm">
                {errors.expiryMonth.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label className="text-sm font-medium">Expiration Year</label>
            <input
              type="number"
              placeholder="YY"
              className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={paymentType === 'Cash'}
              min="2025"
              max="2035"
              step="1"
              {...register('expiryYear')}
            />
            {errors.expiryYear && (
              <span className="text-red-500 text-sm">
                {errors.expiryYear.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">CVV</label>
          <input
            type="password"
            placeholder="123"
            className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={paymentType === 'Cash'}
            {...register('securityCode')}
          />
          {errors.securityCode && (
            <span className="text-red-500 text-sm">
              {errors.securityCode.message}
            </span>
          )}
        </div>
      </section> */}
      <section className="border bg-gray-100 rounded-xl p-6 flex flex-col justify-between">
        <h1 className="font-bold text-lg">Your Order</h1>
        <div className="flex justify-between mt-4">
          <h2 className="font-semibold">Total</h2>
          <h2 className="font-semibold">${total.toFixed(2)}</h2>
        </div>
        <button
          className={`w-full rounded-lg h-10 text-white font-bold mt-4 ${
            paymentType
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!paymentType}
          onClick={formHandleSubmit(onSubmit)} // use formHandleSubmit to handle submit with validation
        >
          Place Order
        </button>
      </section>
    </div>
  );
}

export default Order;
