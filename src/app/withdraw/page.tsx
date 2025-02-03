import WithdrawPanel from '@/components/WithdrawPanel';

const balance = 62003.48; //รอดึง balance จาก user

export default function Withdraw() {
  return <WithdrawPanel balance={balance} />;
}
