'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { buyerAuth } from '@/utils/auth';
import { sellerAuth } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const toast = useToast();
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState<string>('ผู้ซื้อ');
  const [isUploading, setIsUpLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit = async (data: any) => {
    setErrorMessage('');
    setIsUpLoading(true);
    const { username, password } = data;

    if (!username || !password) {
      setErrorMessage('Please fill all the data!');
      setIsUpLoading(false);
      return;
    }

    try {
      let user;
      if (userType === 'ผู้ซื้อ') {
        user = await buyerAuth(username, password);
      } else if (userType === 'ผู้ขาย') {
        user = await sellerAuth(username, password);
      } else {
        setErrorMessage('Something is wrong');
        setIsUpLoading(false);
        return;
      }

      if (user) {
        setTimeout(() => {
          toast?.setToast('success', 'Successfully Sign In!');
        }, 1100);

        setTimeout(() => {
          router.push('/profile');
        }, 2000);
      } else {
        setTimeout(() => {
          toast?.setToast('error', 'Username or Password incorrects');
          setIsUpLoading(false);
        }, 1500);
        return;
      }
    } catch (error) {
      setTimeout(() => {
        toast?.setToast('error', 'Username or Password incorrects');
      }, 500);
      setIsUpLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full px-4 sm:px-10 text-center">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          <div className="flex flex-col w-full md:w-3/5 p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-project-primary mb-6 mt-6">
              Sign In
            </h2>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={() => setUserType('ผู้ซื้อ')}
                className={cn(
                  'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
                  userType === 'ผู้ซื้อ'
                    ? 'border-project-prtext-project-primary text-project-primary'
                    : 'border-transparent text-black'
                )}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setUserType('ผู้ขาย')}
                className={cn(
                  'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
                  userType === 'ผู้ขาย'
                    ? 'border-project-prtext-project-primary text-project-primary'
                    : 'border-transparent text-black'
                )}
              >
                Seller
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                placeholder="Username"
                {...register('username')}
                className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
              />
              <input
                type="password"
                placeholder="Password"
                {...register('password')}
                className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
              />
              <button
                type="submit"
                disabled={isUploading}
                className={cn(
                  'border-2  rounded-full px-12 py-2 inline-block font-semibold',
                  !isUploading
                    ? 'border-project-primary text-project-primary hover:bg-project-primary hover:text-white'
                    : 'bg-gray-500 text-white'
                )}
              >
                Sign In
              </button>
              {errorMessage && (
                <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
              )}
            </form>
          </div>

          <div className="w-full md:w-2/5 bg-project-primary text-white py-10 px-6 md:py-36 md:px-12 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Hello!</h2>
            <p className="mb-8 text-sm md:text-base">
              Register, if you don't have an account
            </p>
            <Link
              href="/"
              className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-project-primary"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
