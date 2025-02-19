import ProductPanel from '@/components/product/ProductPanel';
import { Product } from '@/types/product';
import { Review } from '@/types/review';
import { Seller } from '@/types/user';
import { getProductById } from '@/utils/product';
import { getReviews } from '@/utils/review';
import { getSellerById } from '@/utils/seller';

const tempSeller: Seller = {
  userType: 'seller',
  sellerID: '67b0437ea4b06a82570bc298',
  username: 'petchluvsyou',
  name: 'Error',
  surname: 'Fetching Seller',
  payment: 'promptpay',
  address: '',
  phoneNumber: '',
  score: 10,
  province: 'y',
  city: '',
  zip: '',
  transaction: [],
};

export default async function page({ params }: { params: { pid: string } }) {
  const product: Product | null = await getProductById(params.pid);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }

  const seller: Seller | null = await getSellerById(product.sellerID);
  const reviews: Review[] | null = await getReviews(seller?.sellerID ?? '');

  if (!seller || !reviews) {
    return (
      <ProductPanel
        product={product}
        seller={tempSeller}
        reviews={[]}
      />
    );
  }

  return (
    <ProductPanel
      product={product}
      seller={seller}
      reviews={reviews}
    />
  );
}
