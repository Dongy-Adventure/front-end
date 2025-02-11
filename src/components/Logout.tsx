import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';

export default function Logout() {
  const { logout } = useAuth();
  return (
    <button
      className="bg-gray-200 rounded-2xl p-3 absolute right-8 top-8 md:hidden"
      onClick={logout}
    >
      <Icon
        icon="mdi:logout"
        color="black"
        width="20"
        height="20"
      />
    </button>
  );
}
