'use client';

import React, { useEffect, useState } from 'react';
import { createBuyer } from '@/utils/buyer';
import { createSeller } from '@/utils/seller';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';
import { authSchema, AuthSchema } from '@/lib/validations/auth';
import { buyerAuth, sellerAuth } from '@/utils/auth';
import { Buyer, Seller } from '@/types/user';
import { useRouter } from 'next/navigation';

type Mode = 'Register' | 'Login';

function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const [userType, setUserType] = useState<string>('buyer');
  const [isUploading, setIsUpLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('Register');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthSchema>({
    resolver: mode === 'Register' ? zodResolver(authSchema) : undefined,
  });

  useEffect(() => {
    reset();
    setErrorMessage(null);
    setIsUpLoading(false);
  }, [mode]);

  const onSubmit = async (data: AuthSchema) => {
    setIsUpLoading(true);
    const { username, password } = data;

    try {
      if (mode === 'Register') {
        let result: boolean | null;
        if (userType === 'buyer') {
          result = await createBuyer(password, username);
        } else {
          result = await createSeller(password, username);
        }
        if (result) {
          toast?.setToast('success', 'Successfully Sign Up!');
          setMode('Login');
          console.log(mode);
        } else {
          toast?.setToast(
            'error',
            'There is an error occur! Please try again later'
          );
        }
      } else {
        let user: Buyer | Seller | null;
        if (userType === 'buyer') {
          user = await buyerAuth(username, password);
        } else {
          user = await sellerAuth(username, password);
        }
        if (user) {
          toast?.setToast('success', 'Successfully Sign In!');
          router.push('/profile');
        } else toast?.setToast('error', 'Username or password is incorrect');
      }
    } catch (error) {
      setTimeout(() => {
        toast?.setToast('error', 'Failed to sign up! Please try again later!');
      }, 1500);
    } finally {
      setIsUpLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-project-secondary">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-10 text-center">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          <div className="w-full md:w-3/5 p-6 md:p-10">
            <div className="py-10 md:py-20">
              <h2 className="text-2xl md:text-3xl font-bold text-project-primary mb-4">
                {mode === 'Register' ? 'Register' : 'Sign In'}
              </h2>

              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  onClick={() => setUserType('buyer')}
                  className={cn(
                    'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
                    userType === 'buyer'
                      ? 'border-project-primary text-project-primary'
                      : 'border-transparent text-black'
                  )}
                >
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('seller')}
                  className={cn(
                    'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
                    userType === 'seller'
                      ? 'border-project-primary text-project-primary'
                      : 'border-transparent text-black'
                  )}
                >
                  Seller
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex gap-2 flex-col items-center"
                method="POST"
              >
                <input
                  type="text"
                  {...register('username')}
                  placeholder="Username"
                  className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}

                <input
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                  className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isUploading}
                  className={cn(
                    'border-2 rounded-full px-12 py-2 inline-block font-semibold',
                    !isUploading
                      ? 'border-project-primary text-project-primary hover:bg-project-primary hover:text-white'
                      : 'bg-gray-500 text-white'
                  )}
                >
                  {mode === 'Register' ? 'Register' : 'Sign In'}
                </button>

                {errorMessage && (
                  <p className="mt-6 text-red-500 text-sm">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>

          <div className="w-full md:w-2/5 bg-project-primary text-white py-10 px-6 md:py-36 md:px-12 flex flex-col justify-center rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {mode === 'Register' ? 'Create Account' : 'Hello!'}
            </h2>
            <p className="mb-8 text-sm md:text-base text-nowrap">
              {mode === 'Register'
                ? 'If you have an account, go to the login page'
                : "Register, if you don't have an account"}
            </p>
            <button
              onClick={() =>
                mode === 'Register' ? setMode('Login') : setMode('Register')
              }
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-project-primary"
            >
              {mode === 'Register' ? 'Login' : 'Register'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
