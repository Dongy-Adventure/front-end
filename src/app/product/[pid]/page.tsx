import ProductPanel from '@/components/product/ProductPanel';
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

export default async function Page({ params }: { params: { pid?: string } }) {
  if (!params?.pid) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Invalid product ID.</p>
      </div>
    );
  }

  const product = await getProductById(params.pid);
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <p>Product not found.</p>
      </div>
    );
  }

  const [seller, reviews] = await Promise.all([
    getSellerById(product.sellerID),
    getReviews(product.sellerID ?? '', 'seller'),
  ]);

  return (
    <ProductPanel
      product={product}
      seller={seller || tempSeller}
      reviews={reviews || []}
    />
  );
}
