'use client';

import React, { useState } from 'react';
import { createBuyer } from '@/utils/buyer';
import { createSeller } from '@/utils/seller';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';
import { authSchema, AuthSchema } from '@/lib/validations/auth';
import { buyerAuth, sellerAuth } from '@/utils/auth';

function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const [userType, setUserType] = useState<string>('ผู้ซื้อ');
  const [isUploading, setIsUpLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthSchema) => {
    setIsUpLoading(true);
    const { username, password } = data;

    try {
      if (userType === 'ผู้ซื้อ') {
        await createBuyer(password, username);
      } else if (userType === 'ผู้ขาย') {
        await createSeller(password, username);
      }
      toast?.setToast('success', 'Successfully Sign Up!');
      router.push('/login');
    } catch (error) {
      setTimeout(() => {
        toast?.setToast('error', 'Failed to sign up! Please try again later!');
      }, 1500);
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
                Register
              </h2>

              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  onClick={() => setUserType('ผู้ซื้อ')}
                  className={cn(
                    'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
                    userType === 'ผู้ซื้อ'
                      ? 'border-project-primary text-project-primary'
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

                <input
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="Confirm Password"
                  className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
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
                  Register
                </button>

                {errorMessage && (
                  <p className="mt-6 text-red-500 text-sm">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>

          <div className="w-full md:w-2/5 bg-project-primary text-white py-10 px-6 md:py-36 md:px-12 flex flex-col justify-center rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Create Account
            </h2>
            <p className="mb-8 text-sm md:text-base text-nowrap">
              If you have an account, go to the login page...
            </p>
            <a
              href="/login"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-project-primary"
            >
              Login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
