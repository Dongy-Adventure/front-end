import ProductPanel from '@/components/ProductPanel';
import { Product } from '@/types/product';
import { Seller } from '@/types/user';
import { getProductById } from '@/utils/product';
import { getSellerById } from '@/utils/seller';

const tempSeller: Seller = {
  userType: 'seller',
  sellerID: '67b0437ea4b06a82570bc298',
  username: 'petchluvsyou',
  name: 'PPPP',
  surname: 'TTTT',
  payment: 'promptpay',
  address: '',
  phoneNumber: '',
  score: 0,
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

  if (!seller) {
    return (
      <ProductPanel
        product={product}
        seller={tempSeller}
      />
    );
  }

  return (
    <ProductPanel
      product={product}
      seller={seller}
    />
  );
}
