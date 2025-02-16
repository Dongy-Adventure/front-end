import Carousel from '@/components/product/Carousel';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { getAllProducts } from '@/utils/product';

const exampleProducts = [
  {
    pid: '67b04400a4b06a82570bc299',
    category: 'Dried fruit',
    productName: 'Mango',
    price: 150,
    discountedPrice: 100,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '67b03f31a4b06a82570bc297',
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

export default async function Home() {
  const products: Product[] | null = await getAllProducts();

  console.log(products);

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
            {products &&
              products.map((product) => (
                <ProductCard
                  key={product.productID}
                  pid={product.productID}
                  category={
                    product.tag
                      ? product.tag.length > 0
                        ? product.tag.join(', ')
                        : 'Not Categorized'
                      : 'Not Categorized'
                  }
                  productName={product.productName}
                  price={product.price}
                  discountedPrice={product.price * 0.9}
                  image={product.imageURL}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
