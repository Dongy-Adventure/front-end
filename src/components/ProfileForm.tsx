'use client';

import provinces from '@/constants/provinces.json';
import districts from '@/constants/districts.json';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/validations/profile';
import { useAuth } from '@/context/AuthContext';
import { updateSeller } from '@/utils/seller';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface District {
  id: number;
  provinceCode: number;
  districtCode: number;
  districtNameEn: string;
  districtNameTh: string;
  postalCode: number;
}

export default function ProfileForm({
  userInfo,
}: {
  userInfo: ProfileFormData;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const getProvinceCode = (provinceName: string) => {
    const province = provinces.find((p) => p.provinceNameTh === provinceName);
    return province ? province.provinceCode.toString() : '';
  };

  const getDistrictCode = (districtName: string) => {
    const district = districts.find((d) => d.districtNameTh === districtName);
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

  const getProvinceNameTh = (provinceCode: number) => {
    const province = provinces.find((p) => p.provinceCode === provinceCode);
    return province ? province.provinceNameTh : 'Province not found';
  };

  const getDistrictNameTh = (districtCode: number) => {
    const district = districts.find((p) => p.districtCode === districtCode);
    return district ? district.districtNameTh : 'District not found';
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateSeller(
        data.username,
        data.name,
        data.surname,
        data.phoneNumber,
        data.address,
        getProvinceNameTh(parseInt(data.province)),
        getDistrictNameTh(parseInt(data.city)),
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
      <div className="flex flex-col gap-4 w-4/5">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-sm">
                Username <u>*</u>
              </span>
              <p className="text-red-500 text-sm">{errors.username?.message}</p>
            </div>
            <input
              {...register('username')}
              className="w-full bg-transparent border-[1px] border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
              placeholder=""
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="text-sm">
                Password <u>*</u>
              </span>
            </div>
            <div className="w-full bg-gray-300 border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary">
              **********************
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
              className="w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
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
              className="w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
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
            className="w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
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
            className="w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
            placeholder=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-sm">
              <u>District *</u>
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
            className="w-full bg-transparent border-[1px]  border-gray-300 p-1 rounded-lg hover:border-project-primary"
          >
            <option value=""></option>
            {filteredDistricts
              .slice()
              .sort((a, b) =>
                a.districtNameTh.localeCompare(b.districtNameTh, 'th')
              )
              .map((district: District) => (
                <option
                  key={district.districtCode}
                  value={district.districtCode}
                >
                  {district.districtNameTh}
                </option>
              ))}
          </select>
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
            className="w-full bg-transparent border-[1px]  border-gray-300 p-1 rounded-lg hover:border-project-primary"
          >
            <option value=""></option>
            {provinces
              .slice()
              .sort((a, b) =>
                a.provinceNameTh.localeCompare(b.provinceNameTh, 'th')
              )
              .map((province) => (
                <option
                  key={province.provinceCode}
                  value={province.provinceCode}
                >
                  {province.provinceNameTh}
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
            className="w-full bg-transparent border-[1px]  border-gray-300 p-1.5 rounded-lg hover:border-project-primary"
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
