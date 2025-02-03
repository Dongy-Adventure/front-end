'use client';
import { useState } from 'react';

export default function TopUp() {
  const balance = 123121;
  const [selectedMethod, setSelectedMethod] = useState('PromptPay');
  const [showQr, setShowQr] = useState(false);

  const handleProceed = () => {
    if (selectedMethod === 'PromptPay') {
      setShowQr(true);
    }
  };

  const handleSuccess = () => {
    setShowQr(false);
  };

  return (
    <div className="flex flex-col items-center p-20">
      <div className="text-xl pb-2">ยอดเงินคงเหลือ</div>
      <div className="text-4xl text-project-blue font-bold mb-4">
        {balance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{' '}
        THB
      </div>

      <div className="text-md font-medium pt-12 pb-2">
        โปรดเลือกช่องทางการเติมเงิน
      </div>
      <div className="w-full max-w-sm border rounded-lg p-4 bg-white shadow-md">
        <label className="flex items-center space-x-3">
          <input
            type="radio"
            name="paymentMethod"
            value="PromptPay"
            checked={selectedMethod === 'PromptPay'}
            onChange={() => setSelectedMethod('PromptPay')}
            className="form-radio text-project-blue"
          />
          <span className="text-lg">PromptPay</span>
        </label>
      </div>

      {showQr && (
        <>
          <div className="mt-4">
            <img src="https://promptpay.io/0861114229.png" />
          </div>
          <button
            className="mt-6 bg-gray-200 text-project-blue px-6 py-2 rounded-lg text-lg font-medium"
            onClick={handleSuccess}
          >
            ยืนยัน
          </button>
        </>
      )}

      {!showQr && (
        <button
          className="mt-6 bg-project-blue text-white px-6 py-2 rounded-lg text-lg font-medium"
          onClick={handleProceed}
        >
          ดำเนินการต่อ
        </button>
      )}
    </div>
  );
}
