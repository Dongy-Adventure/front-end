'use client';

import Link from 'next/link';
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
type UserMode = 'Buyer' | 'Seller';

function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const [userType, setUserType] = useState<UserMode>('Buyer');
  const [isUploading, setIsUpLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('Register');
  const [usernameFilled, setUsernameFilled] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);
  const [confirmPasswordFilled, setConfirmPasswordFilled] = useState(false);

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
        if (userType === 'Buyer') {
          result = await createBuyer(password, username);
          if (result) await buyerAuth(username, password);
        } else {
          result = await createSeller(password, username);
          if (result) await sellerAuth(username, password);
        }
        if (result) {
          toast?.setToast('success', 'Successfully Sign Up!');
          router.push('/profile/edit');
        } else {
          toast?.setToast(
            'error',
            'There is an error occur! Please try again later'
          );
        }
      } else {
        let user: Buyer | Seller | null;
        if (userType === 'Buyer') {
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
        toast?.setToast(
          'error',
          'There is an error occur! Please try again later!'
        );
      }, 1500);
    } finally {
      setIsUpLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-project-secondary text-black grid place-items-center">
      <main className="flex-1 max-w-md p-8 bg-project-secondary rounded-md text-black">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center justify-center">
          {mode === 'Register' ? 'Register' : 'Sign In'}
        </h2>

        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setUserType('Buyer')}
            className={cn(
              'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
              userType === 'Buyer'
                ? 'border-project-primary text-project-primary'
                : 'border-transparent text-black'
            )}
          >
            Buyer
          </button>
          <button
            type="button"
            onClick={() => setUserType('Seller')}
            className={cn(
              'px-6 py-2 font-semibold border-b-2 transition-all duration-300',
              userType === 'Seller'
                ? 'border-project-primary text-project-primary'
                : 'border-transparent text-black'
            )}
          >
            Seller
          </button>
        </div>
        <p className="text-center mb-6 md:text-base text-nowrap">
          {mode === 'Register'
            ? 'If you have an account, go to the login page'
            : "Register, if you don't have an account"}
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col"
          method="POST"
        >
          <p className="text-black text-left">
            Username
            {!usernameFilled && <span className="text-black ml-1">*</span>}
          </p>
          <input
            type="text"
            {...register('username')}
            placeholder=""
            onChange={(e) => setUsernameFilled(e.target.value.length > 0)}
            className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <p className="text-black text-left mt-2">
            Password
            {!passwordFilled && <span className="text-black ml-1">*</span>}
          </p>
          <input
            type="password"
            {...register('password')}
            placeholder=""
            onChange={(e) => setPasswordFilled(e.target.value.length > 0)}
            className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {mode === 'Register' ? (
            <>
              <p className="text-black text-left mt-2">
                Confirm Password
                {!confirmPasswordFilled && (
                  <span className="text-black ml-1">*</span>
                )}
              </p>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder=""
                onChange={(e) =>
                  setConfirmPasswordFilled(e.target.value.length > 0)
                }
                className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </>
          ) : (
            <section className="w-full sm:w-72 p-2 h-10" />
          )}

          <button
            type="submit"
            disabled={isUploading}
            className={cn(
              'border-2 rounded-full px-12 py-2 inline-block font-semibold items-center mt-6',
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
        <div className="text-center mt-4">
          <p>
            {mode === 'Register'
              ? 'Already have an account?'
              : "Don't have an account?"}{' '}
            <button
              onClick={() =>
                mode === 'Register' ? setMode('Login') : setMode('Register')
              }
              className="text-blue-500 underline"
            >
              {mode === 'Register' ? 'Sign In' : 'Register'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
