'use client';
import Spinner from '@/components/Spinner';
import { Buyer, Seller } from '@/types/user';
import { getUser } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAuthContext {
  user: Buyer | Seller | null;
  resetContext: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<Buyer | Seller | null>(null);
  const path = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  const resetContext = useCallback(async () => {
    const userData = await getUser();
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    window.location.href = '/';
  }, []);

  useEffect(() => {
    const protectRoute = async () => {
      setIsReady(false);

      // const userStr = localStorage.getItem('user');
      // if (!userStr) {
      //   setIsReady(true);
      //   return router.push('/');
      // }

      const userObj: Buyer | Seller | null = await getUser();
      setUser(userObj);

      // const userType: 'buyer' | 'seller' = userObj.userType;

      // if (userType === 'buyer') {
      //   if (path.includes('seller') && !path.includes('review')) {
      //     router.push('/');
      //   }
      // } else {
      //   if (path.includes('buyer')) {
      //     router.push('/');
      //   }
      // }

      setIsReady(true);
    };

    protectRoute();
  }, [router, path]);

  return (
    <AuthContext.Provider value={{ user, resetContext, logout }}>
      {isReady ? children : <Spinner />}
    </AuthContext.Provider>
  );
};

export default AuthProvider;