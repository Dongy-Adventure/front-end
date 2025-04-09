'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import { getRandomAdvertisements } from '@/utils/advertisement';
import { Advertisement } from '@/types/advertisement';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [advertisements, setAdvertisements] = useState<
    Advertisement[] | null
  >();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      const ads = await getRandomAdvertisements();
      setAdvertisements(ads || null);
    };

    fetchAdvertisements();
  }, []);

  useEffect(() => {
    if (!advertisements || advertisements.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [advertisements]);

  const prevSlide = () => {
    if (!advertisements || advertisements.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    if (!advertisements || advertisements.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {advertisements &&
          advertisements.map((ad, index) => (
            <Link
              key={index}
              href={`/product/${ad.productID}`}
              className="min-w-full flex-shrink-0 relative aspect-[3/1]"
            >
              <Image
                src={ad.imageURL}
                alt={`Slide ${index + 1}`}
                className="object-cover"
                fill
                unoptimized
              />
            </Link>
          ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute inset-y-0 left-0 w-1/8 rounded-r-full bg-transparent hover:bg-black/20 transition-opacity opacity-0 hover:opacity-100"
      >
        <Icon
          icon="line-md:chevron-left"
          width="24"
          height="24"
          className="relative self-center text-white w-full h-16"
        />
      </button>
      <button
        onClick={nextSlide}
        className="absolute inset-y-0 right-0 w-1/8 rounded-l-full bg-transparent hover:bg-black/20 transition-opacity opacity-0 hover:opacity-100"
      >
        <Icon
          icon="line-md:chevron-right"
          width="24"
          height="24"
          className="relative self-center text-white w-full h-16"
        />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 mb-6">
        {advertisements &&
          advertisements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 transition-all rotate-45 border-project-pink border-[1px] ${currentIndex === index ? 'bg-project-pink' : 'bg-white'}`}
            />
          ))}
      </div>
    </div>
  );
}
