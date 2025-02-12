'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  withdrawSchema,
  WithdrawFormData,
} from '@/lib/validations/seller/withdraw';

export default function WithdrawPanel({ balance }: { balance: number }) {
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WithdrawFormData>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      method: 'PromptPay',
      phoneNumber: '',
      amount: '',
      bankName: '',
    },
  });

  const selectedMethod = watch('method');

  const onSubmit = (data: WithdrawFormData) => {
    console.log('Withdraw data:', data);
    setShowForm(false);
  };

  return (
    <div className="text-project-blue flex flex-col items-center p-20">
      <div className="text-xl pb-2">ยอดเงินคงเหลือ</div>
      <div className="text-4xl font-bold mb-4">
        {balance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{' '}
        THB
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col py-8 gap-4"
        >
          <p className="text-center text-xl font-bold pb-10">
            {selectedMethod === 'PromptPay' ? 'PromptPay' : 'บัญชีธนาคาร'}
          </p>
          {selectedMethod === 'AccountNumber' && (
            <div className="pb-4">
              <p className="text-left pb-2">ธนาคาร</p>
              <select
                {...register('bankName')}
                className="w-80 border-b-[1px] bg-transparent border-project-blue text-project-blue"
              >
                <option value="">เลือกธนาคาร</option>
                <option value="Bangkok Bank">Bangkok Bank</option>
                <option value="Kasikorn Bank">Kasikorn Bank</option>
                <option value="Siam Commercial Bank">
                  Siam Commercial Bank
                </option>
              </select>
            </div>
          )}
          <div className="flex flex-col pb-4">
            <p className="pb-2">เบอร์โทรศัพท์</p>
            <input
              {...register('phoneNumber')}
              className="w-80 border-b-[1px] bg-transparent border-project-blue text-project-blue"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
            )}
          </div>
          <div className="flex flex-col pb-4">
            <p className="pb-2">จำนวนเงิน</p>
            <input
              {...register('amount')}
              className="w-80 border-b-[1px] bg-transparent border-project-blue text-project-blue"
            />
            {errors.amount && (
              <span className="text-red-500">{errors.amount.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 bg-gray-200 text-project-blue px-6 py-2 rounded-lg text-lg font-medium"
          >
            ยืนยัน
          </button>
        </form>
      ) : (
        <>
          <div className="text-md font-medium pt-12 pb-2">
            โปรดเลือกช่องทางการถอนเงิน
          </div>
          <div className="w-full max-w-sm border rounded-lg p-4 bg-white shadow-md mb-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('method')}
                value="PromptPay"
                className="form-radio text-project-blue"
              />
              <span className="text-lg">PromptPay</span>
            </label>
          </div>
          <div className="w-full max-w-sm border rounded-lg p-4 bg-white shadow-md mb-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                {...register('method')}
                value="AccountNumber"
                className="form-radio text-project-blue"
              />
              <span className="text-lg">บัญชีธนาคาร</span>
            </label>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-12 bg-project-blue text-white px-6 py-2 rounded-lg text-lg font-medium"
          >
            ดำเนินการต่อ
          </button>
        </>
      )}
    </div>
  );
}
