import Navbar from '@/components/Navbar';
import ProfileForm from '@/components/ProfileForm';
import Spinner from '@/components/Spinner';
import TransactionHistory from './TransactionHistory';

export default function Home() {
  return <main className="flex justify-center">
    <TransactionHistory />
  </main>;
}
