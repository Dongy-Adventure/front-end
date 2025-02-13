import Image from 'next/image';
import notFound from '@/../public/404.png';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-8 lg:py-16 px:8 lg:px-24 w-full h-auto bg-project-secondary gap-4">
      <Image
        src={notFound}
        alt="404"
        width={874}
        height={376}
        className="w-1/2 min-w-72 h-auto pb-2"
      />
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        That Page Cant Be Found
      </h1>
      <p className="text-sm md:text-md lg:text-lg xl:text-xl font-thin text-center px-12 leading-tight">
        It looks like nothing was found at this location. Maybe try to search
        for what you are looking for?
      </p>
      <Link href="./">
        <button className="mt-6 w-40 h-12 bg-project-dark rounded-xl text-white font-semibold">
          Go To Homepage
        </button>
      </Link>
    </div>
  );
}
