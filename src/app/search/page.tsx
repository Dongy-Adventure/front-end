'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAllProducts } from '@/utils/product';
import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import Fuse from 'fuse.js';

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get('q') || '';
  const price = searchParams.get('price') || '';
  const categories = searchParams.get('categories') || '';
  const color = searchParams.get('color') || '';

  const [allProducts, setAllProducts] = useState<Product[] | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState(price.split('-')[0] || '');
  const [maxPrice, setMaxPrice] = useState(price.split('-')[1] || '');
  const [maxAvailablePrice, setMaxAvailablePrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getAllProducts();
        setAllProducts(products || []);

        const highestPrice = (products || []).reduce(
          (max, product) => (product.price > max ? product.price : max),
          0
        );

        setMinPrice('0');
        setMaxAvailablePrice(highestPrice ?? 0);

        if (!maxPrice) setMaxPrice(highestPrice.toString());
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
        threshold: 0.5,
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

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (q) params.set('q', q);
    if (categories) params.set('categories', categories);
    if (color) params.set('color', color);

    if (minPrice && maxPrice) {
      params.set('price', `${minPrice}-${maxPrice}`);
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleClearPrice = () => {
    setMinPrice('0');
    setMaxPrice(maxAvailablePrice.toString());
  };

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      {/* Breadcrumb Navigation */}
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
        <div className="flex flex-col max-w-96 h-auto bg-project-secondary rounded-xl py-12 px-8 gap-12">
          <div>
            <p className="font-semibold pb-4">Price Filter</p>
            <div className="flex gap-2">
              <div className="flex flex-col">
                <p className="text-sm pb-1">Min Price</p>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-28 h-8 rounded-md border p-1"
                  placeholder="Min"
                />
              </div>
              <span className="pt-7">&ndash;</span>
              <div className="flex flex-col">
                <p className="text-sm pb-1">Max Price</p>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-28 h-8 rounded-md border p-1"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-4">
              <p>
                Price: ฿{minPrice || 0} &mdash; ฿{maxPrice || 0}
              </p>
              <button
                onClick={handleFilter}
                className="h-10 w-20 font-semibold bg-project-solitude rounded-xl"
              >
                Filter
              </button>
            </div>
            <button
              onClick={handleClearPrice}
              className="underline"
            >
              clear
            </button>
          </div>

          <div>
            <p className="font-semibold">Product Categories</p>
          </div>
          <div>
            <p className="font-semibold">Filter by Color</p>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-5xl">
          <div className="h-40 w-full bg-black text-white rounded-md">
            temp banner
          </div>
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : allProducts?.length === 0 ? (
            <p className="text-gray-500">No products available.</p>
          ) : (
            <div className="flex flex-col">
              {filteredProducts.length === 0 ? (
                <p className="text-gray-500">No matching results found.</p>
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
                      discountedPrice={product.price * 1.0}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
