'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSellerBalance } from '@/utils/seller';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import {
  PaymentSchema,
  PaymentFormValues,
} from '@/lib/validations/seller/withdraw';

export default function Wallet() {
  const { user } = useAuth();
  const [sellerBalance, setSellerBalance] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentSchema(sellerBalance ?? 0)),
    defaultValues: {
      phoneNumber: user?.phoneNumber,
    },
  });

  const selectedPayment = watch('paymentMethod');

  useEffect(() => {
    if (user?.userType === 'seller') {
      const getBalance = async () => {
        const balance = await getSellerBalance();
        setSellerBalance(balance ?? 0);
      };
      getBalance();
    }
  }, []);

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Payment submitted:', data);
  };

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'>'}</p>
        <p className="text-black font-semibold">Wallet</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={5} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-semibold pb-4">Wallet</h1>
          <div className="bg-black h-28 w-72  rounded-2xl px-8 text-white mb-12">
            <p className="pt-10 font-semibold">Balance</p>
            <p className="font-semibold text-2xl">
              {Number(sellerBalance).toFixed(2)} THB
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex flex-col p-4 pr-8 rounded-lg bg-gray-100 h-fit w-fit md:min-w-96">
              <p className="font-semibold text-xl">Payment Method</p>
              <p className="text-sm font-light pb-4">
                Please select the preferred payment method to use on this order.
              </p>
              <div className="flex flex-col gap-2">
                {['Cash on Delivery', 'PromptPay'].map((method) => (
                  <label
                    key={method}
                    className="flex gap-2"
                  >
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      className="accent-project-primary w-3 h-3 self-center"
                      value={method}
                      onChange={() => setValue('paymentMethod', method)}
                    />
                    {method}
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message
                    ? 'Please select a payment method'
                    : ''}
                </p>
              )}
              <span className="pt-20 flex gap-2">
                <input
                  type="checkbox"
                  {...register('agreeToTerms')}
                  className="w-3 h-3 accent-project-primary self-center"
                />
                <p>I have read and agree to the </p>
                <Link
                  href="https://www.youtube.com/watch?v=r5pEFAm63NM&pp=ygUdc3BvbmdlYm9iIHN0aW5reSBzb3VuZCAxIGhvdXI%3D"
                  className="font-semibold -mx-0.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </Link>
              </span>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>
            <div className="flex flex-col p-4 rounded-lg bg-gray-100 w-full md:w-fit leading-none">
              <p className="font-semibold pb-4">Withdrawal</p>
              <p className="text-sm font-light">Enter withdrawal amount.</p>
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}

              <div className="flex gap-2">
                <input
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="w-full md:w-72 rounded-md bg-white border-[1px] p-2 mt-0.5"
                  placeholder="Enter amount"
                  min="1"
                  max={sellerBalance ?? 0}
                  step="0.01"
                />
                <p className="self-center">THB</p>
              </div>

              <p className="text-sm font-light text-right">
                Available balance:{' '}
                {sellerBalance ? Number(sellerBalance).toFixed(2) : '0.00'} THB
              </p>

              {selectedPayment === 'PromptPay' && (
                <>
                  <p className="text-sm font-light mt-3">Enter phone number.</p>
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber?.message}
                  </p>
                  <div className="flex gap-2">
                    <input
                      {...register('phoneNumber')}
                      placeholder="Enter phone number"
                      className="w-72 rounded-md bg-white border-[1px] p-2 mt-0.5"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full h-12 bg-project-primary rounded-xl mt-12 font-semibold text-white"
              >
                Confirm Withdrawal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
