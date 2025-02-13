import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';

const exampleProducts = [
  {
    pid: '1001',
    category: 'Dried fruit',
    productName: 'Mango',
    price: 150,
    discountedPrice: 100,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1002',
    category: 'Dried fruit',
    productName: 'Pineapple',
    price: 130,
    discountedPrice: 90,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1003',
    category: 'Dried fruit',
    productName: 'Banana',
    price: 110,
    discountedPrice: 80,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1004',
    category: 'Dried fruit',
    productName: 'Apple',
    price: 140,
    discountedPrice: 95,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1005',
    category: 'Dried fruit',
    productName: 'Peach',
    price: 160,
    discountedPrice: 120,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1006',
    category: 'Dried fruit',
    productName: 'Cherry',
    price: 180,
    discountedPrice: 130,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1007',
    category: 'Dried fruit',
    productName: 'Grapes',
    price: 145,
    discountedPrice: 105,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1008',
    category: 'Dried fruit',
    productName: 'Blueberry',
    price: 175,
    discountedPrice: 140,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1009',
    category: 'Dried fruit',
    productName: 'Cranberry',
    price: 155,
    discountedPrice: 115,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1010',
    category: 'Dried fruit',
    productName: 'Strawberry',
    price: 121,
    discountedPrice: 21,
    image: 'public/placeholder2.jpg',
  },
];

export default function Home() {
  return (
    <div className="pt-4 flex flex-col">
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
          <div className="flex overflow-scroll gap-4 py-8">
            {exampleProducts.map((product) => (
              <ProductCard
                key={product.pid}
                pid={product.pid}
                category={product.category}
                productName={product.productName}
                price={product.price}
                discountedPrice={product.discountedPrice}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
