import Profile from '@/app/profile/edit/page';
import Transaction from '@/app/seller/transaction-history/page'
import PostProduct from '@/app/seller/post/page';

export default function Home() {
  return <main className="flex justify-center">
    <PostProduct/>
  </main>;
}