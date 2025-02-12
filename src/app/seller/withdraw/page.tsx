'use client';
import WithdrawPanel from '@/components/seller/wallet/WithdrawPanel';
import { getSellerBalance } from '@/utils/seller';
import { useEffect, useState } from 'react';

export default function Withdraw() {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    const getBalance = async () => {
      const bal = await getSellerBalance();
      setBalance(bal ?? 0);
    };

    getBalance();
  }, []);
  return <WithdrawPanel balance={balance} />;
}
