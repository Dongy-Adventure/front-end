import Carousel from '@/components/Carousel';

export default function Index() {
  return (
    <div className="pt-2 flex flex-col">
      <div className="w-full">
        <Carousel />
      </div>
      <div className="p-12">
        <div>
          <p className="text-xl lg:text-2xl font-semibold">
            Recommended Products
          </p>
          <p className="text-md lg:text-md font-light">
            Don't wait. The time will never be just right.
          </p>
        </div>
      </div>
    </div>
  );
}
