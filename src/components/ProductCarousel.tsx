import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import placeholder from '@/../public/placeholder2.jpg';
import placeholder2 from '@/../public/placeholder.png';
import Image from 'next/image';

const products = [
  { id: 1, image: placeholder2 },
  { id: 2, image: placeholder },
  { id: 3, image: placeholder2 },
  { id: 4, image: placeholder },
  { id: 5, image: placeholder2 },
  { id: 6, image: placeholder },
];

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [timer, setTimer] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const restartTimer = () => {
    if (timer) clearInterval(timer);
    const newTimer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % products.length);
    }, 5000);
    setTimer(newTimer);
  };

  useEffect(() => {
    restartTimer();
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    setStartIndex(Math.max(0, Math.min(current - 1, products.length - 4)));
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % products.length);
    restartTimer();
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
    restartTimer();
  };

  return (
    <div className="w-full h-full p-4 border-[1px]">
      <div className="relative w-full h-full">
        <div className="w-full h-[400px] flex items-center justify-center overflow-hidden">
          <Image
            src={products[current].image}
            alt="Product"
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
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
      </div>
      <div className="flex justify-center w-full overflow-hidden mt-2">
        {products.slice(startIndex, startIndex + 4).map((product, index) => (
          <div
            key={product.id}
            className="w-1/4"
          >
            <Image
              src={product.image}
              alt="Thumbnail"
              width={64}
              height={64}
              className={`object-cover w-full h-full cursor-pointer border-2 transition-all transform ${
                startIndex + index === current
                  ? 'border-green-500 scale-110'
                  : 'border-transparent'
              }`}
              onClick={() => {
                setCurrent(startIndex + index);
                restartTimer();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
