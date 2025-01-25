'use client';
import { Buyer, Seller } from '@/types/user';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
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
    const userData = null; // implement API
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    window.location.href = '/';
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, resetContext, logout }}
    ></AuthContext.Provider>
  );
};

export default AuthProvider;
