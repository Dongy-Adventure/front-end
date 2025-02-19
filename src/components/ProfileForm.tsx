'use client';

import provinces from '@/constants/provinces.json';
import districts from '@/constants/districts.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/validations/profile';
import { updateSeller } from '@/utils/seller';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface District {
  id: number;
  provinceCode: number;
  districtCode: number;
  districtNameEn: string;
  postalCode: number;
}

export default function ProfileForm({
  userInfo,
}: {
  userInfo: ProfileFormData;
}) {
  const router = useRouter();
  const { user } = useAuth();

  const getProvinceCode = (provinceName: string) => {
    const province = provinces.find((p) => p.provinceNameEn === provinceName);
    return province ? province.provinceCode.toString() : '';
  };

  const getDistrictCode = (districtName: string) => {
    const district = districts.find((d) => d.districtNameEn === districtName);
    return district ? district.districtCode.toString() : '';
  };

  const defaultProvinceCode = getProvinceCode(userInfo.province);
  const defaultDistrictCode = getDistrictCode(userInfo.city);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...userInfo,
      province: defaultProvinceCode,
      city: defaultDistrictCode,
    },
  });
  const selectedProvince = watch('province');

  useEffect(() => {
    if (selectedProvince) {
      const provinceCode = Number(selectedProvince);
      const newDistricts = districts.filter(
        (d) => d.provinceCode === provinceCode
      );
      setFilteredDistricts(newDistricts);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedProvince]);

  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);

  const getProvinceNameEn = (provinceCode: number) => {
    const province = provinces.find((p) => p.provinceCode === provinceCode);
    return province ? province.provinceNameEn : 'Province not found';
  };

  const getDistrictNameEn = (districtCode: number) => {
    const district = districts.find((p) => p.districtCode === districtCode);
    return district ? district.districtNameEn : 'District not found';
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateSeller(
        data.name,
        data.surname,
        data.phoneNumber,
        data.address,
        getProvinceNameEn(parseInt(data.province)),
        getDistrictNameEn(parseInt(data.city)),
        data.zip
      );
      router.push('/profile');
    } catch (error) {
      console.error('Update failed', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full"
    >
      <h1 className="text-xl font-semibold pb-4">Update Profile</h1>
      <div className="flex flex-col gap-4 md:w-4/5">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-sm">
                Username <u>*</u>
              </span>
            </div>
            <div className="font-medium w-full bg-gray-300 border-[1px]  border-gray-300 p-1.5 rounded-lg">
              {user?.username}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-sm">
                Password <u>*</u>
              </span>
            </div>
            <div className="font-medium w-full bg-gray-300 border-[1px]  border-gray-300 p-1.5 rounded-lg">
              **************
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-sm">
                Name <u>*</u>
              </span>
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>
            <input
              {...register('name')}
              className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
              placeholder=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-sm">
                Surname <u>*</u>
              </span>
              <p className="text-red-500 text-sm">{errors.surname?.message}</p>
            </div>
            <input
              {...register('surname')}
              className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
              placeholder=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">
              Phone Number <u>*</u>
            </span>
            <p className="text-red-500 text-sm">
              {errors.phoneNumber?.message}
            </p>
          </div>
          <input
            {...register('phoneNumber')}
            className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">
              Address <u>*</u>
            </span>
            <p className="text-red-500 text-sm">{errors.address?.message}</p>
          </div>
          <input
            {...register('address')}
            className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">
              Province <u>*</u>
            </span>
            <p className="text-red-500 text-sm">{errors.province?.message}</p>
          </div>
          <select
            {...register('province')}
            onChange={(e) => {
              const provinceCode = Number(e.target.value);
              const newDistricts = districts.filter(
                (district) => district.provinceCode === provinceCode
              );
              setFilteredDistricts(newDistricts);
              setValue('zip', '');
            }}
            className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1 rounded-lg hover:border-project-primary"
          >
            {provinces
              .slice()
              .sort((a, b) =>
                a.provinceNameEn.localeCompare(b.provinceNameEn, 'en')
              )
              .map((province) => (
                <option
                  key={province.provinceCode}
                  value={province.provinceCode}
                >
                  {province.provinceNameEn}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">
              District <u>*</u>
            </span>
            <p className="text-red-500 text-sm">{errors.city?.message}</p>
          </div>
          <select
            {...register('city')}
            onChange={(e) => {
              const selectedDistrict = districts.find(
                (district) => district.districtCode === Number(e.target.value)
              );
              setValue(
                'zip',
                selectedDistrict ? selectedDistrict.postalCode.toString() : ''
              );
            }}
            className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1 rounded-lg hover:border-project-primary"
          >
            <option value=""></option>
            {filteredDistricts
              .slice()
              .sort((a, b) =>
                a.districtNameEn.localeCompare(b.districtNameEn, 'rn')
              )
              .map((district: District) => (
                <option
                  key={district.districtCode}
                  value={district.districtCode}
                >
                  {district.districtNameEn}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">
              ZIP Code <u>*</u>
            </span>
            <p className="text-red-500 text-sm">{errors.zip?.message}</p>
          </div>
          <input
            {...register('zip')}
            readOnly
            className="font-medium w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
            placeholder="Zip"
          />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="w-24 h-10 mt-8 bg-gray-300 rounded-lg font-semibold text-black align-center justify-center hover:bg-gray-400"
            onClick={() => router.push('/profile')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-24 h-10 mt-8 bg-project-primary rounded-lg font-semibold text-white align-center justify-center hover:bg-project-dark"
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
