'use client';
import Image from 'next/image';
import notFound from '@/../public/404.png';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import { useEffect } from 'react';

export default function NotFound() {
  const toast = useToast();

  useEffect(() => {
    toast?.setToast('error', 'Sorry! Page not found');
  }, []);

  return (
    <div className="flex flex-col items-center py-8 pt-0 md:pt-16 lg:py-16 lg:px-24 w-full justify-center h-screen md:h-auto bg-project-secondary gap-4">
      <Image
        src={notFound}
        alt="404"
        width={874}
        height={376}
        className="w-1/2 min-w-72 h-auto pb-2"
      />
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        This Page Can't Be Found
      </h1>
      <p className="text-sm md:text-md lg:text-lg xl:text-xl font-light text-center px-12 leading-tight text-gray-600">
        It looks like nothing was found at this location. Maybe try to search
        for what you are looking for?
      </p>
      <Link href="/home">
        <button className="mt-6 w-40 h-12 bg-project-dark rounded-xl text-white font-semibold">
          Go To Homepage
        </button>
      </Link>
    </div>
  );
}
