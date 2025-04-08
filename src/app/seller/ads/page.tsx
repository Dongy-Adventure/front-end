'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import { getSellerProducts } from '@/utils/product';
import { Product } from '@/types/product';
import wristWatch from '@/../public/wrist-watch.png';
import { getSellerBalance, withdrawMoney } from '@/utils/seller';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaymentSchema,
  PaymentFormValues,
} from '@/lib/validations/seller/withdraw';
import { useToast } from '@/context/ToastContext';

export default function Profile() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const [sellerBalance, setSellerBalance] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle image change
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

  const handleSelect = (item: typeof selectedProduct) => {
    setSelectedProduct(item);
    setIsOpen(false);
  };

  const onSubmit = async (data: PaymentFormValues) => {
    const res = await withdrawMoney(data.amount);
    if (res) {
      toast?.setToast('success', 'Withdraw Completed!');
      window.location.href = '/seller/wallet';
    } else [toast?.setToast('error', 'Error Withdraw')];
  };

  useEffect(() => {
    if (user?.userType === 'seller') {
      const getProducts = async () => {
        const products = await getSellerProducts();
        setProducts(products);
      };
      const getBalance = async () => {
        const balance = await getSellerBalance();
        setSellerBalance(balance ?? 0);
      };

      getProducts();
      getBalance();
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentSchema(sellerBalance ?? 0)),
    defaultValues: {
      phoneNumber: user?.phoneNumber,
    },
  });

  const selectedPayment = watch('paymentMethod');

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <Link
          href="/profile"
          className="text-gray-400"
        >
          My Account
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Create Ads</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={6} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-semibold pb-4">Create Ads</h1>
          <div className="flex gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                Insert banner photo <u>*</u>
              </span>
              <label
                htmlFor="productImageInput"
                className="w-[600px] h-[300px] border border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer overflow-hidden bg-white rounded-lg"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p>Click here to upload image</p>
                )}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleProductImageChange}
                className="hidden"
                id="productImageInput"
              />
            </div>
            <div className="flex flex-col max-w-72 w-72 gap-2">
              <span className="text-sm">
                Choose product to advertise <u>*</u>
              </span>
              {/* Selected Item */}
              <div
                className="flex items-center justify-between p-2 border rounded cursor-pointer bg-white w-full"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center space-x-2 h-8 px-2">
                  {!selectedProduct ? (
                    <span className="text-gray-400">Select Product</span>
                  ) : (
                    <>
                      <Image
                        src={
                          selectedProduct?.image && selectedProduct.image !== ''
                            ? selectedProduct.image
                            : wristWatch
                        }
                        alt={selectedProduct?.productName || ''}
                        width={40}
                        height={40}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span>{selectedProduct?.productName}</span>
                    </>
                  )}
                </div>
                <span className="text-gray-400">
                  {isOpen ? (
                    <Icon
                      icon="icon-park-outline:up"
                      width="20"
                      height="20"
                    />
                  ) : (
                    <Icon
                      icon="icon-park-outline:down"
                      width="20"
                      height="20"
                    />
                  )}
                </span>
              </div>

              {/* Dropdown Options */}
              {isOpen && (
                <div className="z-10 w-full border rounded bg-white shadow max-w-80 py-2">
                  {products?.map((item) => (
                    <div
                      key={item.productID}
                      className="flex items-center p-2 hover:bg-project-secondary cursor-pointer"
                      onClick={() => handleSelect(item)}
                    >
                      <Image
                        src={
                          item.image && item.image !== ''
                            ? item.image
                            : wristWatch
                        }
                        alt={item.productName}
                        width={36}
                        height={36}
                        className="w-9 h-9 object-cover rounded mr-2"
                      />
                      <span>{item.productName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <h1 className="text-xl font-semibold pb-4 pt-12">Payment</h1>
          <div className="bg-black h-28 w-72  rounded-2xl px-8 text-white mb-12">
            <p className="pt-10 font-semibold">Balance</p>
            <p className="font-semibold text-2xl">
              {Number(sellerBalance).toFixed(2)} THB
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex flex-col p-4 pr-8 rounded-lg bg-gray-100 h-fit w-fit md:min-w-96">
              <p className="font-semibold text-xl">Payment Method</p>
              <p className="text-sm font-light pb-4">
                Please select the preferred payment method to use on this order.
              </p>
              <div className="flex flex-col gap-2">
                {['Cash on Delivery', 'PromptPay'].map((method) => (
                  <label
                    key={method}
                    className="flex gap-2"
                  >
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      className="accent-project-primary w-3 h-3 self-center"
                      value={method}
                      onChange={() => setValue('paymentMethod', method)}
                    />
                    {method}
                  </label>
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">
                  {errors.paymentMethod.message
                    ? 'Please select a payment method'
                    : ''}
                </p>
              )}
              <span className="pt-20 flex gap-2">
                <input
                  type="checkbox"
                  {...register('agreeToTerms')}
                  className="w-3 h-3 accent-project-primary self-center"
                />
                <p>I have read and agree to the </p>
                <Link
                  href="https://www.youtube.com/watch?v=r5pEFAm63NM&pp=ygUdc3BvbmdlYm9iIHN0aW5reSBzb3VuZCAxIGhvdXI%3D"
                  className="font-semibold -mx-0.5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </Link>
              </span>
              {errors.agreeToTerms && (
                <p className="text-red-500 text-sm">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>
            <div className="flex flex-col p-4 rounded-lg bg-gray-100 w-full md:w-fit leading-none">
              <p className="font-semibold pb-4">Withdrawal</p>
              <p className="text-sm font-light">Enter withdrawal amount.</p>
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount.message}</p>
              )}

              <div className="flex gap-2">
                <input
                  type="number"
                  {...register('amount', { valueAsNumber: true })}
                  className="w-full md:w-72 rounded-md bg-white border-[1px] p-2 mt-0.5"
                  placeholder="Enter amount"
                  min="1"
                  max={sellerBalance ?? 0}
                  step="0.01"
                />
                <p className="self-center">THB</p>
              </div>

              <p className="text-sm font-light text-right">
                Available balance:{' '}
                {sellerBalance ? Number(sellerBalance).toFixed(2) : '0.00'} THB
              </p>

              {selectedPayment === 'PromptPay' && (
                <>
                  <p className="text-sm font-light mt-3">Enter phone number.</p>
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber?.message}
                  </p>
                  <div className="flex gap-2">
                    <input
                      {...register('phoneNumber')}
                      placeholder="Enter phone number"
                      className="w-72 rounded-md bg-white border-[1px] p-2 mt-0.5"
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full h-12 bg-project-primary rounded-xl mt-12 font-semibold text-white"
              >
                Confirm Withdrawal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
