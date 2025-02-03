import WithdrawPanel from '@/components/seller/wallet/WithdrawPanel';

const balance = 799000; //รอดึง balance จาก user

export default function Withdraw() {
  return <WithdrawPanel balance={balance} />;
}
