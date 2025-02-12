import ProductPostingForm from '@/components/seller/post/ProductPostingForm';

interface productInfo {
  sellerName: string;
  sellerSurname: string;
  productName: string;
  price: string;
  amount: string;
  description: string;
  productImage: string;
}

const tempProduct: productInfo = {
  sellerName: 'Korn',
  sellerSurname: 'Surapat',
  productName: 'Amphetamine',
  price: '5000',
  amount: '1000',
  description: 'Kimochiii!!!',
  productImage: '',
};

export default function Profile() {
  return <ProductPostingForm productInfo={tempProduct} />;
}
