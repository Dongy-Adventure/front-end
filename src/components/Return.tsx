import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function Return() {
  const router = useRouter();
  return (
    <button
      className="bg-gray-200 rounded-2xl p-3 absolute left-8 top-8 md:hidden"
      onClick={() => router.back()}
    >
      <Icon
        icon="ion:chevron-back"
        color="black"
        width="20"
        height="20"
      />
    </button>
  );
}
