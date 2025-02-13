import Link from 'next/link';

export default function page({ params }: { params: { pid: string } }) {
  return (
    <div className="p-12 pt-16 flex flex-col">
      <div className="flex gap-2">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black">Product Datail</p>
      </div>
      pid: {params.pid}
    </div>
  );
}
