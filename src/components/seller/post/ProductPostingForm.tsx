'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Return from '@/components/Return';
import Link from 'next/link';
import { createProduct } from '@/utils/product';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/router';

interface productInfo {
  sellerName: string;
  sellerSurname: string;
  productName: string;
  price: string;
  amount: string;
  description: string;
  productImage: string;
}

export default function PostProduct({
  productInfo,
}: {
  productInfo: productInfo;
}) {
  const { user } = useAuth();
  const [productName, setProductName] = useState(productInfo.productName);
  const [price, setPrice] = useState(productInfo.price);
  const [amount, setAmount] = useState(productInfo.amount);
  const [description, setDescription] = useState(productInfo.description);
  const [productImage, setProductImage] = useState(productInfo.productImage);

  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    const status = await createProduct(form.name, form.price,...);
    if (status) {
      toast?.setToast('success', "Post product succeeded")
      router.push("/profile");
    } else {
      toast?.setToast('error', "Post product failed")
      router.push("/home")
    }
  };

  const handleProductImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          console.log(e.target.result as string);
          setProductImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product posted');
    // Implement API call to post product
  };

  return (
    <div className="flex flex-col items-center pb-20 gap-12">
      <Return />
      {user?.userType === 'seller' || 'buyer' /*can delete buyer*/ ? (
        <div className="flex flex-col items-center justify-center gap-8 pt-8">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-project-blue font-bold text-xl">
              {productInfo.sellerName} {productInfo.sellerSurname}
            </p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <label
              htmlFor="fileInput"
              className="flex items-center justify-center w-48 h-48 border-[1px] border-project-blue rounded-lg cursor-pointer bg-gray-100"
              style={{
                backgroundImage: productImage ? `url(${productImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!productImage && (
                <span className="text-gray-400">Click to upload</span>
              )}
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProductImageChange}
            />
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Product Name
            </p>
            <input
              className="w-80 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
              placeholder=""
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Price
            </p>
            <input
              className="w-80 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
              placeholder=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Amount
            </p>
            <input
              className="w-80 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
              placeholder=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></input>
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Description
            </p>
            <textarea
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <button
              className="w-20 h-12 bg-gray-200 text-project-blue border rounded-xl hover:bg-gray-300"
              onClick={() => {
                setProductImage(productInfo.productImage);
                setProductName(productInfo.productName);
                setPrice(productInfo.price);
                setAmount(productInfo.amount);
              }}
            >
              Reset
            </button>
            <Link href="../profile">
              <button className="w-20 h-12 bg-project-blue text-white border rounded-xl hover:bg-blue-950"
              onClick={() => handleSubmit(...)}>
                Post
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-8 pt-8">
          <div className="text-black absolute top-8">
            Sorry, but you are not a seller.
          </div>
        </div>
      )}
    </div>
  );
}
