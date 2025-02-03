import TopUpPanel from '@/components/TopUpPanel';

const balance = 62003.48; //รอดึง balance จาก user

export default function TopUp() {
  return <TopUpPanel balance={balance} />;
}
