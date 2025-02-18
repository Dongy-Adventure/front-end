'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import placeholder202 from '@/../public/placeholder202.jpg';
import placeholder201 from '@/../public/placeholder201.webp';
import placeholder203 from '@/../public/placeholder203.webp';
import Image from 'next/image';

const images = [placeholder201, placeholder202, placeholder203];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full flex-shrink-0"
            unoptimized
          />
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
        {images.map((_, index) => (
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
