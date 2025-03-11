import { useState } from 'react';

export default function PendingPayment() {
  const [currentPage, setCurrentPage] = useState(2);
  const totalPages = 4;
  const products = new Array(3).fill({
    name: "Women's wallet Hand Purse",
    quantity: 1,
    image: 'https://via.placeholder.com/50', // Placeholder for product image
  });

  return (
    <div className="absolute top-0 left-0 w-screen h-screen grid place-items-center z-50 bg-black/30 backdrop-blur-sm">
      <main className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
        <div className="p-4 bg-pink-100 rounded-md flex justify-between items-center">
          <h1 className="text-lg font-bold">Order #5448411811</h1>
          <span className="bg-pink-200 text-pink-600 px-3 py-1 rounded text-sm">
            Pending payment
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Order Date</span>
            <span className="text-sm">2024-12-8 12.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Buyer</span>
            <span className="text-sm font-bold">Petchluvsyou</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Payment Method</span>
            <span className="text-sm">PromptPay</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-bold">$210.09</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Product</span>
            <span>Quantity</span>
          </div>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 mr-2"
                />
                <span className="text-sm">{product.name}</span>
              </div>
              <span className="text-sm font-bold">{product.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt; Back
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Next &gt;
          </button>
        </div>
      </main>
    </div>
  );
}
