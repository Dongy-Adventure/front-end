'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import Return from './Return';
import Link from 'next/link';

interface UserInfo {
  name: string;
  surname: string;
  tel: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  language: string;
  image: string;
}

export default function ProfileForm({ userInfo }: { userInfo: UserInfo }) {
  const { user } = useAuth();
  const [tel, setTel] = useState(userInfo.tel);
  const [address, setAddress] = useState(userInfo.address);
  const [city, setCity] = useState(userInfo.city);
  const [province, setProvince] = useState(userInfo.province);
  const [zip, setZip] = useState(userInfo.zip);
  const [language, setLanguage] = useState(userInfo.language);
  const [image, setImage] = useState(userInfo.image);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          console.log(e.target.result as string);
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };
  return (
    <div className="flex flex-col items-center pb-20 gap-12">
      <div className="flex flex-col items-center justify-center gap-8 pt-8">
        <Return />
        {user?.userType === 'seller' && (
          <div className="text-black absolute right-4 top-8">Score: 10</div>
        )}
        <div className="flex flex-col gap-4 items-center">
          <label
            htmlFor="fileInput"
            className="flex items-center justify-center w-48 h-48 border-[1px] border-project-blue rounded-lg cursor-pointer bg-gray-100"
            style={{
              backgroundImage: image ? `url(${image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!image && <span className="text-gray-400">Click to upload</span>}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-project-blue font-bold text-xl">
            {userInfo.name} {userInfo.surname}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 pt-4 w-full">
          <p className="text-project-blue text-left pb-2 font-semibold">
            เบอร์โทรศัพท์
          </p>
          <input
            className="w-80 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
            placeholder=""
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col items-start gap-2 pt-4">
          <p className="text-project-blue text-left pb-2 font-semibold">
            ที่อยู่
          </p>
          <input
            className="w-80 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
            placeholder="1600 Pennsylvania Avenue NW"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
          <div className="flex gap-8">
            <select
              className="w-36 p-0 pb-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option
                value=""
                disabled
              >
                - City -
              </option>
              <option value="Wangchan">Wangchan</option>
              <option value="Patumwan">Patumwan</option>
              <option value="Phayathai">Phayathai</option>
            </select>
            <select
              className="w-36 p-0 pb-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option
                value=""
                disabled
              >
                - Province -
              </option>
              <option value="Bangkok">Bangkok</option>
              <option value="Rayong">Rayong</option>
              <option value="Chiangmai">Chiangmai</option>
            </select>
          </div>
          <input
            className="w-14 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
            placeholder="Zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="text-project-blue text-left font-semibold">
          ภาษา / Language
        </p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between w-80 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue">
            <div className="flex gap-2">
              <Icon
                icon="twemoji:flag-thailand"
                className="self-center"
              />
              <span className="p-1">ไทย / Thai</span>
            </div>
            <input
              type="radio"
              name="TH"
              value="TH"
              checked={language === 'TH'}
              onChange={handleLanguageChange}
              className="form-radio accent-project-blue"
            />
          </label>
          <label className="flex items-center justify-between w-80 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue">
            <div className="flex gap-2">
              <Icon
                icon="twemoji:flag-us-outlying-islands"
                className="self-center"
              />
              <span className="p-1">English (US)</span>
            </div>
            <input
              type="radio"
              name="EN"
              value="EN"
              checked={language === 'EN'}
              onChange={handleLanguageChange}
              className="form-radio accent-project-blue"
            />
          </label>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button
          className="w-20 h-12 bg-gray-200 text-project-blue border rounded-xl hover:bg-gray-300"
          onClick={() => {
            setImage(userInfo.image);
            setAddress(userInfo.address);
            setCity(userInfo.city);
            setProvince(userInfo.province);
            setZip(userInfo.zip);
            setLanguage(userInfo.language);
          }}
        >
          รีเซ็ต
        </button>
        <Link href="../profile">
          <button className="w-20 h-12 bg-project-blue text-white border rounded-xl hover:bg-blue-950">
            บันทึก
          </button>
        </Link>
      </div>
    </div>
  );
}
