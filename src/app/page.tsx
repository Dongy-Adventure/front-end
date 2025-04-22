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
import { Icon } from '@iconify/react';

type Mode = 'Register' | 'Login';
type UserMode = 'Buyer' | 'Seller';

function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const [userType, setUserType] = useState<UserMode>('Buyer');
  const [isUploading, setIsUpLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('Register');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleProductImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const onSubmit = async (data: AuthSchema) => {
    setIsUpLoading(true);
    const { profilePic, name, surname, username, password } = data;

    try {
      if (mode === 'Register') {
        let result: boolean | null = null;
        if (userType === 'Buyer') {
          result = await createBuyer(
            imageFile,
            name,
            surname,
            password,
            username
          );
          if (result) await buyerAuth(username, password);
        } else {
          result = await createSeller(
            imageFile,
            name,
            surname,
            password,
            username
          );
          if (result) await sellerAuth(username, password);
        }

        if (result) {
          toast?.setToast('success', 'Successfully Sign Up!');
          router.push('/profile/edit');
        } else {
          toast?.setToast(
            'error',
            'There was an error! Please try again later.'
          );
        }
      } else {
        // Sign In
        let user: Buyer | Seller | null = null;
        if (userType === 'Buyer') {
          user = await buyerAuth(username, password);
        } else {
          user = await sellerAuth(username, password);
        }

        // Handling user sign-in result
        if (user) {
          toast?.setToast('success', 'Successfully Sign In!');
          router.push('/profile');
        } else {
          toast?.setToast('error', 'Username or password is incorrect');
        }
      }
    } catch (error) {
      // Handling unexpected errors
      setTimeout(() => {
        toast?.setToast('error', 'There is an error! Please try again later!');
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
          {mode === 'Register' && (
            <>
              <div className="mb-4 flex flex-col text-center justify-center items-center">
                <div className="relative flex items-center flex-col">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-20 h-20 rounded-full object-fit"
                    />
                  ) : (
                    <Icon
                      icon="mdi:account"
                      className="h-16 w-16 text-gray-500"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    {...register('profilePic')}
                    onChange={handleProductImageChange}
                    data-testid="image"
                    className="absolute inset-0 w-20 h-20 opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="productImageInput"
                    className="text-black text-sm cursor-pointer"
                  >
                    Profile Picture
                  </label>
                </div>
              </div>
              <p className="text-black text-left">
                Name
                <span className="text-black ml-1">*</span>
              </p>
              <input
                type="text"
                {...register('name')}
                placeholder=""
                data-testid="name"
                className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <p className="text-black text-left">
                Surname
                <span className="text-black ml-1">*</span>
              </p>
              <input
                type="text"
                {...register('surname')}
                placeholder=""
                data-testid="surname"
                className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
              />
            </>
          )}

          {errors.surname && (
            <p className="text-red-500 text-sm">{errors.surname.message}</p>
          )}
          <p className="text-black text-left">
            Username
            <span className="text-black ml-1">*</span>
          </p>
          <input
            type="text"
            {...register('username')}
            placeholder=""
            data-testid="username"
            className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <p className="text-black text-left mt-2">
            Password
            <span className="text-black ml-1">*</span>
          </p>
          <input
            type="password"
            {...register('password')}
            placeholder=""
            data-testid="password"
            className="bg-gray-100 w-full sm:w-72 p-2 mb-1 rounded outline-none text-sm text-black items-center"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {mode === 'Register' ? (
            <>
              <p className="text-black text-left mt-2">
                Confirm Password
                <span className="text-black ml-1">*</span>
              </p>
              <input
                type="password"
                {...register('confirmPassword')}
                placeholder=""
                data-testid="confirm-password"
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
