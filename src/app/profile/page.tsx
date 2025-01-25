'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export default function Profile() {
  const [language, setLanguage] = useState('TH');
  const [image, setImage] = useState(null);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };
  return (
    <div className="flex flex-col items-center bg-gray-100 pb-20">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-12 gap-8 bg-gray-100">
        {/* <Link
          href="./"
          className="bg-gray-200 rounded-2xl p-3"
        >
          <Icon
            icon="ion:chevron-back"
            color="black"
            width="24"
            height="24"
          />
        </Link> */}
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
          <p className="text-project-blue font-bold text-xl">Dalai JS</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <p className="text-project-blue text-left pb-2">ที่อยู่</p>
          <input
            className="w-80 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue"
            placeholder="1600 Pennsylvania Avenue NW"
          ></input>
          <div className="flex gap-8">
            <select
              className="w-36 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                --
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <select
              className="w-36 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                --
              </option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <input
            className="w-14 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue"
            placeholder="Zip"
          ></input>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4">
        <p className="text-project-blue text-left">ภาษา / Language</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center justify-between w-80 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue">
            <div className="flex gap-2">
              <Icon icon="twemoji:flag-thailand" />
              <span>ไทย / Thai</span>
            </div>
            <input
              type="radio"
              name="TH"
              value="TH"
              checked={language === 'TH'}
              onChange={handleLanguageChange}
              className="form-radio"
            />
          </label>
          <label className="flex items-center justify-between w-80 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:ring-0 focus:border-project-blue text-project-blue">
            <div className="flex gap-2">
              <Icon icon="twemoji:flag-us-outlying-islands" />
              <span>English (US)</span>
            </div>
            <input
              type="radio"
              name="EN"
              value="EN"
              checked={language === 'EN'}
              onChange={handleLanguageChange}
              className="form-radio"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
