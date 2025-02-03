'use client';
import { useState } from 'react';

export default function WithdrawPanel({ balance }: { balance: number }) {
  const [selectedMethod, setSelectedMethod] = useState('PromptPay');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');

  const handleProceed = () => {
    setShowForm(true);
  };

  const handleConfirm = () => {
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

      {showForm && (
        <>
          {selectedMethod === 'PromptPay' && (
            <div className="flex flex-col py-8">
              <p className="text-center text-xl font-bold pb-10">PromptPay</p>
              <div className="flex text-left gap-8">
                <div className="flex flex-col">
                  <p className="text-project-blue text-left pb-2">
                    เบอร์โทรศัพท์
                  </p>
                  <input
                    className="w-36 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                    placeholder=""
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
                <div className="flex flex-col">
                  <p className="text-project-blue text-left pb-2">จำนวนเงิน</p>
                  <div>
                    <input
                      className="w-32 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-basefocus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                      placeholder=""
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    ></input>
                    THB
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedMethod === 'AccountNumber' && (
            <div className="flex flex-col py-8 gap-4">
              <p className="text-project-blue text-center pb-2 text-xl font-bold pb-10">
                บัญชีธนาคาร
              </p>
              <div className="flex text-left gap-8">
                <div className="flex flex-col">
                  <p className="text-project-blue text-left pb-2">ธนาคาร</p>
                  <select
                    className="p-0 w-36 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option
                      value=""
                      disabled
                    ></option>
                    <option value="Bangkok Bank">Bangkok Bank</option>
                    <option value="Kasikorn Bank">Kasikorn Bank</option>
                    <option value="Siam Commercial Bank">
                      Siam Commercial Bank
                    </option>
                    <option value="Krungthai Bank">Krungthai Bank</option>
                    <option value="TMBThanachart Bank">
                      TMBThanachart Bank
                    </option>
                    <option value="Government Savings Bank">
                      Government Savings Bank
                    </option>
                    <option value="CIMB Thai Bank">CIMB Thai Bank</option>
                    <option value="UOB Thailand">UOB Thailand</option>
                    <option value="Bank of Ayudhya">
                      Bank of Ayudhya (Krungsri)
                    </option>
                    <option value="LH Bank">LH Bank</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <p className="text-project-blue text-left pb-2">เลขบัญชี</p>
                  <input
                    className="w-36 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                    placeholder=""
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <p className="text-project-blue text-left pb-2">จำนวนเงิน</p>
                <div>
                  <input
                    className="w-32 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                    placeholder=""
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                  THB
                </div>
              </div>
            </div>
          )}
          <button
            className="mt-6 bg-gray-200 text-project-blue px-6 py-2 rounded-lg text-lg font-medium"
            onClick={handleConfirm}
          >
            ยืนยัน
          </button>
        </>
      )}

      {!showForm && (
        <>
          <div className="text-md font-medium pt-12 pb-2">
            โปรดเลือกช่องทางการถอนเงิน
          </div>
          <div className="w-full max-w-sm border rounded-lg p-4 bg-white shadow-md mb-2">
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
          <div className="w-full max-w-sm border rounded-lg p-4 bg-white shadow-md mb-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="AccountNumber"
                checked={selectedMethod === 'AccountNumber'}
                onChange={() => setSelectedMethod('AccountNumber')}
                className="form-radio text-project-blue"
              />
              <span className="text-lg">เลขบัญชี</span>
            </label>
          </div>
          <button
            className="mt-6 bg-project-blue text-white px-6 py-2 rounded-lg text-lg font-medium"
            onClick={handleProceed}
          >
            ดำเนินการต่อ
          </button>
        </>
      )}
    </div>
  );
}
