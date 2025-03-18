'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAllProducts } from '@/utils/product';
import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import Fuse from 'fuse.js';

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const price = searchParams.get('price') || '';
  const categories = searchParams.get('categories') || '';
  const color = searchParams.get('color') || '';

  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getAllProducts();
        setAllProducts(products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!allProducts) return;

    let filtered = allProducts;

    if (q) {
      const fuse = new Fuse(filtered, {
        keys: [
          { name: 'productName', weight: 0.5 },
          { name: 'description', weight: 0.3 },
          { name: 'tag', weight: 0.2 },
          { name: 'color', weight: 0.1 },
        ],
        threshold: 0.3,
        includeScore: true,
      });

      const results = fuse.search(q);
      filtered = results.map((result) => result.item);
    }

    if (price) {
      const [min, max] = price.split('-').map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    if (categories) {
      const categoryList = categories.split(',');
      filtered = filtered.filter((product) =>
        categoryList.includes(product.tag[0])
      );
    }

    if (color) {
      filtered = filtered.filter((product) => product.color === color);
    }

    setFilteredProducts(filtered);
  }, [q, price, categories, color, allProducts]);

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      <div className="flex gap-2 pb-8">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Search</p>
      </div>
      <span className="text-xl font-semibold flex gap-1 pb-4">
        Search Results For <p className="text-project-primary">{q}</p>
      </span>
      <div className="flex pt-4 gap-16 text-black">
        <div className="max-w-72 w-full h-auto bg-project-secondary rounded-xl">
          filter part
        </div>
        <div className="flex flex-col gap-8">
          <div className="h-40 w-full bg-black text-white rounded-md">
            temp banner
          </div>
          {loading ? (
            <p className=" text-gray-500">Loading products...</p>
          ) : allProducts?.length === 0 ? (
            <p className=" text-gray-500">No products available.</p>
          ) : (
            <div className="flex flex-col">
              {filteredProducts.length === 0 ? (
                <p className=" text-gray-500">No matching results found.</p>
              ) : (
                <ul className="flex gap-y-8 gap-x-6 flex-wrap">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.productID}
                      pid={product.productID}
                      category={
                        product.tag?.length
                          ? product.tag.join(', ')
                          : 'Not Categorized'
                      }
                      productName={product.productName}
                      price={product.price}
                      discountedPrice={product.price * 0.9}
                      image={product.imageURL}
                    />
                  ))}
                </ul>
              )}

              <div className="mt-4">
                *for debugging*
                <p>Price: {price || 'Any'}</p>
                <p>Categories: {categories || 'All'}</p>
                <p>Color: {color || 'Any'}</p>
              </div>
              {/* <h2 className="text-lg font-semibold mt-6">All Products</h2>
              <ul className="mt-4 space-y-4">
                {allProducts &&
                  allProducts.map((item) => (
                    <li
                      key={item.productID}
                      className="border p-4 rounded-lg"
                    >
                      <p>
                        <strong>Name:</strong> {item.productName}
                      </p>
                      <p>
                        <strong>Price:</strong> ${item.price}
                      </p>
                      <p>
                        <strong>Color:</strong> {item.color}
                      </p>
                      <p>
                        <strong>Amount:</strong> {item.amount}
                      </p>
                      <p>
                        <strong>Seller ID:</strong> {item.sellerID}
                      </p>
                      <p>
                        <strong>Created At:</strong> {item.createdAt}
                      </p>
                      <p>
                        <strong>Description:</strong> {item.description}
                      </p>
                      <p>
                        <strong>Image URL:</strong> {item.imageURL}
                      </p>
                      <p>
                        <strong>Tags:</strong> {item.tag && item.tag.join(', ')}
                      </p>
                    </li>
                  ))}
              </ul> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
