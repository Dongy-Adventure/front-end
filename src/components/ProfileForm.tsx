'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/validations/profile';
import { useAuth } from '@/context/AuthContext';
import Return from './Return';
import { updateSeller } from '@/utils/seller';
import Image from 'next/image';
import Pakichu from '@/../public/placeholder2.jpg';
import { useRouter } from 'next/navigation';

export default function ProfileForm({
  userInfo,
}: {
  userInfo: ProfileFormData;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: userInfo,
  });

  const image = watch('image');

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateSeller(data.name, data.surname, data.tel, data.address);
      router.push('/profile');
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setValue('image', e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center pb-20 gap-12"
    >
      <div className="flex flex-col items-center justify-center gap-8 pt-8">
        <Return />
        {user?.userType === 'seller' && (
          <div className="text-black absolute right-4 top-8">Score: 10</div>
        )}

        <div className="flex flex-col gap-4 items-center">
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-48 h-48 border border-project-blue rounded-lg cursor-pointer bg-gray-100"
            style={{
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!image && (
              <Image
                src={Pakichu}
                alt="Pakichu"
                className="object-contain rounded-lg"
              />
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <p className="flex text-project-blue font-bold text-xl gap-8 items-center w-full">
            <input
              {...register('name')}
              className="w-36 p-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
              placeholder="Name"
            />
            <input
              {...register('surname')}
              className="w-36 p-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
              placeholder="Surname"
            />
          </p>
          <p className="text-red-500 text-sm">
            {errors.name?.message || errors.surname?.message}
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 pt-4 w-full">
          <p className="text-project-blue text-left pb-2 font-semibold">
            เบอร์โทรศัพท์
          </p>
          <input
            {...register('tel')}
            className="w-80 p-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
            placeholder="Phone number"
          />
          <p className="text-red-500 text-sm">{errors.tel?.message}</p>
        </div>

        <div className="flex flex-col items-start gap-2 pt-4">
          <p className="text-project-blue text-left pb-2 font-semibold">
            ที่อยู่
          </p>
          <input
            {...register('address')}
            className="w-80 p-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
            placeholder="Address"
          />
          <p className="text-red-500 text-sm">{errors.address?.message}</p>

          <div className="flex gap-8">
            <select
              {...register('city')}
              className="w-36 p-0 pb-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
            >
              <option value="">- City -</option>
              <option value="Wangchan">Wangchan</option>
              <option value="Patumwan">Patumwan</option>
              <option value="Phayathai">Phayathai</option>
            </select>
            <select
              {...register('province')}
              className="w-36 p-0 pb-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
            >
              <option value="">- Province -</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Rayong">Rayong</option>
              <option value="Chiangmai">Chiangmai</option>
            </select>
          </div>
          <p className="text-red-500 text-sm">
            {errors.city?.message || errors.province?.message}
          </p>

          <input
            {...register('zip')}
            className="w-80 p-1 border-0 border-b border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
            placeholder="Zip"
          />
          <p className="text-red-500 text-sm">{errors.zip?.message}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="w-20 h-12 bg-gray-200 text-project-blue border rounded-xl hover:bg-gray-300"
          onClick={() => {
            Object.keys(userInfo).forEach((key) =>
              setValue(
                key as keyof ProfileFormData,
                userInfo[key as keyof ProfileFormData]
              )
            );
          }}
        >
          รีเซ็ต
        </button>
        <button
          type="submit"
          className="w-20 h-12 bg-project-blue text-white border rounded-xl hover:bg-blue-950"
        >
          บันทึก
        </button>
      </div>
    </form>
  );
}
