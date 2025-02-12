'use client';

import Return from '@/components/Return';
import { COLORS } from '@/constants/color';
import { TAGS } from '@/constants/tags';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { createProduct } from '@/utils/product';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface ProductInfo {
  sellerName: string;
  sellerSurname: string;
  productName: string;
  price: number;
  description: string;
  productImage: string;
  color: string;
  tag: string[];
}

export default function PostProductForm() {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);

  const { control, handleSubmit, setValue, getValues } = useForm<ProductInfo>({
    defaultValues: {
      productName: '',
      price: 0.0,
      description: '',
      productImage: '',
      color: '',
      tag: [] as string[],
    },
  });

  const handleProductImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setValue('productImage', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  // Handle tag selection (Adding/removing tags)
  const handleTagToggle = (tag: string) => {
    const currentTags = getValues('tag');
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else setTags([...tags, tag]);
    const updatedTags = currentTags.includes(tag)
      ? currentTags.filter((t: string) => t !== tag)
      : [...currentTags, tag];
    setValue('tag', updatedTags);
  };

  // Handle form submission
  const onSubmit = async (data: ProductInfo) => {
    const { productName, price, description, productImage, color, tag } = data;
    const status = await createProduct(
      productName,
      Number(price),
      description,
      productImage,
      color,
      tag
    );
    if (status) {
      toast?.setToast('success', 'Post product succeeded');
      router.push('/seller/');
    } else {
      toast?.setToast('error', 'Post product failed');
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center pb-20 gap-12">
      <Return />

      <div className="flex flex-col items-center justify-center gap-8 pt-8">
        <div className="flex flex-col gap-4 items-center">
          <p className="text-project-blue font-bold text-xl">
            {user?.name} {user?.surname}
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-48 h-48 border-[1px] border-project-blue rounded-lg cursor-pointer bg-gray-100"
            style={{
              backgroundImage: getValues('productImage')
                ? `url(${getValues('productImage')})`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!getValues('productImage') && (
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Product Name
            </p>
            <Controller
              name="productName"
              control={control}
              render={({ field }) => (
                <input
                  className="w-full p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                  placeholder=""
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Price
            </p>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  className="w-full p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                  placeholder=""
                  {...field}
                  type="number"
                />
              )}
            />
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Description
            </p>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none text-project-blue"
                  placeholder="Product Description"
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Color
            </p>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <select
                  className="w-full p-2 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                  {...field}
                >
                  {COLORS.map((c) => (
                    <option
                      key={c}
                      value={c}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="flex flex-col items-start gap-2 pt-4 w-full">
            <p className="text-project-blue text-left pb-2 font-semibold">
              Tags
            </p>
            <div className="flex gap-2 flex-wrap">
              {TAGS.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => handleTagToggle(t)}
                  className={`px-4 py-2 border rounded-full text-sm ${
                    tags.includes(t) ? 'bg-blue-500 text-white' : 'bg-gray-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="w-20 h-12 bg-gray-200 text-project-blue border rounded-xl hover:bg-gray-300"
              onClick={() => setValue('productImage', '')}
            >
              Reset
            </button>
            <button
              type="submit"
              className="w-20 h-12 bg-project-blue text-white border rounded-xl hover:bg-blue-950"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
