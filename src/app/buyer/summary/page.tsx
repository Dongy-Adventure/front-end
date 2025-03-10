// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useToast } from '@/context/ToastContext';
// import { useRouter } from 'next/navigation';
// import CartCard from '@/components/buyer/cart/CartCard';
// import { Product } from '@/types/product';
// import Summary from '@/components/buyer/cart/Summary';

// export default function SummaryCart() {
//   const toast = useToast();
//   const router = useRouter();
//   const [carts, setCarts] = useState<Product[]>([]);
//   const [selected, setSelected] = useState<string[]>([]);

//   const toggleSelect = (id: string) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   useEffect(() => {
//     // const getProduct = async () => {
//     //   const products = await getSellerProducts();
//     //   setProducts(products ?? []);
//     // };
//   }, []);

//   const onDelete = async (productID: string) => {
//     toast?.setToast('success', 'Product deleted successfully!');
//     router.refresh();
//   };

//   return (
//     <div className="p-12 md:px-20 md:pt-16 flex flex-col">
//       <div className="flex gap-2 pb-12">
//         <Link
//           href="/home"
//           className="text-gray-400"
//         >
//           Home
//         </Link>
//         <p className="text-gray-400">{'\u003E'}</p>
//         <p className="text-black font-semibold">Cart</p>
//       </div>
//       <div className="flex gap-16 text-black">
//         <div className="flex flex-col w-full">
//           <h1 className="text-3xl font-bold pb-4 text-project-primary">Cart</h1>
//           <main className="overflow-x-auto p-8 flex gap-8">
//             <table className="w-full">
//               <thead className="border-b border-gray-300 p-3 font-semibold text-left">
//                 <tr>
//                   <th>Status</th>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Total</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-300">
//                 {carts.map((cart: Product) => (
//                   <CartCard
//                     key={cart.productID}
//                     product={cart}
//                     selected={selected}
//                     toggleSelect={toggleSelect}
//                   />
//                 ))}
//               </tbody>
//             </table>
//             <Summary
//               total={cartDummy
//                 .filter((product) => selected.includes(product.productID))
//                 .reduce((sum, product) => sum + product.price, 0)}
//               products={carts.filter((product) =>
//                 selected.includes(product.productID)
//               )}
//             />
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
