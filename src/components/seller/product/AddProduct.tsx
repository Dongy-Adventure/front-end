import { COLORS } from '@/constants/color';
import { TAGS } from '@/constants/tags';
import { useToast } from '@/context/ToastContext';
import { createProduct } from '@/utils/product';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface ProductInfo {
  amount: number;
  sellerName: string;
  sellerSurname: string;
  productName: string;
  price: number;
  description: string;
  image: string;
  productImage: File | null;
  color: string;
  tag: string[];
}

export default function AddProduct(props: { closing: () => void }) {
  const toast = useToast();
  const [selectedColor, setSelectedColor] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle image change
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { control, handleSubmit, setValue, getValues } = useForm<ProductInfo>({
    defaultValues: {
      amount: 0,
      productName: '',
      price: 0.0,
      description: '',
      productImage: null,
      color: '',
      tag: [] as string[],
    },
  });

  const onSubmit = async (data: ProductInfo) => {
    const { productName, price, description, color, tag, amount } = data;

    const status = await createProduct(
      productName,
      Number(price),
      description,
      imageFile,
      color,
      tag,
      Number(amount)
    );
    if (status) {
      toast?.setToast('success', 'Post product succeeded');
      window.location.href = '/seller/product-on-display';
    } else {
      toast?.setToast('error', 'Post product failed');
    }
  };

  return (
    <main className="absolute top-0 left-0 w-screen h-screen grid place-items-center z-50 bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-4/5 h-4/5 bg-gray-100 rounded-md"
      >
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <div className="bg-purple-100 p-4 rounded-md text-lg font-semibold">
            Add new product
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Insert product picture</p>
            <div className="border border-gray-300 w-full h-52 flex items-center justify-center text-gray-500">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-full object-contain"
                />
              ) : (
                <p>Preview will be shown here</p>
              )}
            </div>

            <div className="grid place-items-center mt-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleProductImageChange}
                className="hidden"
                id="productImageInput"
              />
              <label
                htmlFor="productImageInput"
                className="mt-3 bg-gray-200 py-2 font-bold px-4 rounded text-gray-600 cursor-pointer"
              >
                Upload Image
              </label>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md ml-6">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Product Detail</h2>
            <div
              className="bg-project-primary text-white font-bold px-2 rounded-full"
              onClick={props.closing}
            >
              x
            </div>
          </div>

          <div className="mt-4">
            <div>
              <label className="block text-sm font-medium">
                Product Name *
              </label>
            </div>
            <Controller
              name="productName"
              control={control}
              render={({ field }) => (
                <input
                  className="pt-0 w-full p-2 border rounded mt-1 border-b-[1px] bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
                  placeholder=""
                  data-testid="name"
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">
              Product Description *
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  className="rounded-lg p-2 w-full border outline-none"
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Amount *</label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <input
                  className="w-full p-2 border rounded mt-1"
                  placeholder=""
                  data-testid="amount"
                  {...field}
                  type="number"
                />
              )}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Price *</label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  className="w-full p-2 border rounded mt-1"
                  placeholder=""
                  data-testid="price"
                  {...field}
                  type="number"
                />
              )}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Tag</label>
            <Controller
              name="tag"
              control={control}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2 mt-2">
                  {TAGS.map((tag) => {
                    const isSelected = field.value.includes(tag);
                    return (
                      <span
                        key={tag}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                          isSelected ? 'bg-project-secondary' : 'bg-gray-100'
                        }`}
                        data-testid={`tag-${tag}`}
                        onClick={() => {
                          const newTags = isSelected
                            ? field.value.filter((t: string) => t !== tag)
                            : [...field.value, tag];

                          setValue('tag', newTags);
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              )}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium">Colour</label>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 mt-2">
                  {COLORS.map((color) => (
                    <div
                      key={color}
                      className={`w-6 h-6 rounded-full border ${color === selectedColor ? 'ring-2 ring-black' : ''}`}
                      style={{ backgroundColor: color }}
                      data-testid={`color-${color}`}
                      onClick={() => {
                        setSelectedColor(color);
                        setValue('color', color);
                      }}
                    ></div>
                  ))}
                </div>
              )}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-project-primary hover:bg-project-dark text-white font-bold py-1 px-8 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
