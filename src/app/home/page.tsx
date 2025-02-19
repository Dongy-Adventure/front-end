import Carousel from '@/components/product/Carousel';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { getAllProducts } from '@/utils/product';

export default async function Home() {
  const products: Product[] | null = await getAllProducts();

  console.log(products);

  return (
    <div className="pt-8 flex flex-col">
      <div className="w-full">
        <Carousel />
      </div>
      <div className="p-12">
        <div>
          <p className="text-xl lg:text-2xl font-semibold">
            Recommended Products
          </p>
          <p className="text-md lg:text-md font-light">
            Don&apos;t wait. The time will never be just right.
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
