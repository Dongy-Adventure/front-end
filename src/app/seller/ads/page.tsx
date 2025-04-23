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
import { getSellerAdvertisements } from '@/utils/advertisement';
import { Product } from '@/types/product';
import wristWatch from '@/../public/wrist-watch.png';
import { getSellerBalance, withdrawMoney } from '@/utils/seller';
import { createAdvertisement } from '@/utils/advertisement';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaymentSchema,
  PaymentFormValues,
} from '@/lib/validations/seller/withdraw';
import {
  AdvertisementSchema,
  AdvertisementFormValues,
} from '@/lib/validations/seller/advertisement';
import { useToast } from '@/context/ToastContext';
import { Advertisement } from '@/types/advertisement';

export default function Profile() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const [sellerBalance, setSellerBalance] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[] | null>();
  const [advertisements, setAdvertisements] = useState<
    Advertisement[] | null
  >();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleProductImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
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
    if (!selectedProduct || !imageFile) {
      toast?.setToast('error', 'Product and image are required');
      return;
    }
    console.log('id', selectedProduct.productID);

    const success = await createAdvertisement(
      data.amount,
      imageFile,
      data.paymentMethod,
      selectedProduct.productID
    );
    if (success) {
      toast?.setToast('success', 'Advertisement created successfully!');
      router.push('/seller/ads');
    } else {
      toast?.setToast('error', 'Failed to create advertisement.');
    }
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
      const getAdvertisements = async () => {
        const advertisements = await getSellerAdvertisements();
        setAdvertisements(advertisements);
        console.log(advertisements);
      };

      getProducts();
      getBalance();
      getAdvertisements();
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
        <p className="text-gray-400">{'>'}</p>
        <Link
          href="/profile"
          className="text-gray-400"
        >
          My Account
        </Link>
        <p className="text-gray-400">{'>'}</p>
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
                {['Wallet Balance'].map((method) => (
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
                  {errors.paymentMethod.message}
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
              <p className="text-sm font-light">
                Enter your preferred advertisement fee.
              </p>
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
              <button
                type="submit"
                className="w-full h-12 bg-project-primary rounded-xl mt-12 font-semibold text-white"
              >
                Create Ads
              </button>
            </div>
          </form>
          <h1 className="text-xl font-semibold pb-4 pt-12">
            Advertisement History
          </h1>
          <div className="overflow-x-auto p-4">
            <table className="table-fixed w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th className="font-medium w-60">Date</th>
                  <th className="font-medium w-80">Ads ID</th>
                  <th className="font-medium w-60">Payment Method</th>
                  <th className="font-medium w-40">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {advertisements?.map((ad: Advertisement) => (
                  <tr
                    key={ad.advertisementID}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-3">{ad.createdAt}</td>
                    <td className="py-3">{ad.advertisementID}</td>
                    <td className="py-3">{ad.payment}</td>
                    <td className="py-3">{ad.amount} THB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
