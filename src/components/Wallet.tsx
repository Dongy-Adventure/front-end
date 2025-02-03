import Link from 'next/link';

export default function Wallet({ balance }: { balance: number }) {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="w-80 bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between h-40">
        <div className="text-project-blue font-bold text-2xl">Wallet</div>
        <div className="flex justify-between items-end">
          <div>
            <div className="font-light">ยอดเงินคงเหลือ</div>
            <div className="text-project-blue text-2xl font-bold">
              {balance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <Link href="/topup">
            <button className="bg-project-blue text-white px-4 py-1 rounded-lg text-sm font-medium">
              เติมเงิน
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
