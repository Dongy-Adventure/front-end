import ProductPanel from '@/components/ProductPanel';
import { Product } from '@/types/product';
import { getProductById } from '@/utils/product';

export default async function page({ params }: { params: { pid: string } }) {
  const product: Product | null = await getProductById(params.pid);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }

  return <ProductPanel product={product} />;
}
