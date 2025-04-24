'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAllProducts } from '@/utils/product';
import { Product } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { TAGS } from '@/constants/tags';
import { COLORS } from '@/constants/color';

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

  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [colorCounts, setColorCounts] = useState<Record<string, number>>({});
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories ? categories.split(',') : []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    color ? color.split(',') : []
  );
  const [sortType, setSortType] = useState<'name' | 'price' | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (type: 'name' | 'price') => {
    if (!filteredProducts) return;

    let sortedProducts = [...filteredProducts];
    let newSortOrder: 'asc' | 'desc' = 'asc';

    if (sortType === type) {
      // Toggle sort order if same type is clicked
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    if (type === 'name') {
      sortedProducts.sort((a, b) =>
        newSortOrder === 'asc'
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName)
      );
    } else if (type === 'price') {
      sortedProducts.sort((a, b) =>
        newSortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    }

    setFilteredProducts(sortedProducts);
    setSortType(type);
    setSortOrder(newSortOrder);
  };

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

    const categoryMap: Record<string, number> = Object.fromEntries(
      TAGS.map((category) => [category, 0])
    );

    const colorMap: Record<string, number> = Object.fromEntries(
      COLORS.map((color) => [color, 0])
    );

    allProducts.forEach((product) => {
      product.tag?.forEach((tag) => {
        if (categoryMap[tag] !== undefined) {
          categoryMap[tag] += 1;
        }
      });

      if (product.color && colorMap[product.color] !== undefined) {
        colorMap[product.color] += 1;
      }
    });
    setCategoryCounts(categoryMap);
    setColorCounts(colorMap);
  }, [allProducts]);

  useEffect(() => {
    if (!allProducts) return;

    let filtered = allProducts;

    if (q) {
      const fuse = new Fuse(filtered, {
        keys: ['productName'],
        threshold: 0.3,
        distance: 100,
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

    if (selectedCategories.length) {
      filtered = filtered.filter((product) =>
        product.tag.some((tag) => selectedCategories.includes(tag))
      );
    }

    if (selectedColors.length) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    setFilteredProducts(filtered);

    const categoryMap: Record<string, number> = Object.fromEntries(
      TAGS.map((category) => [category, 0])
    );

    const colorMap: Record<string, number> = Object.fromEntries(
      COLORS.map((color) => [color, 0])
    );

    filtered.forEach((product) => {
      product.tag.forEach((tag) => {
        categoryMap[tag] = (categoryMap[tag] || 0) + 1;
      });

      if (product.color) {
        colorMap[product.color] = (colorMap[product.color] || 0) + 1;
      }
    });

    setCategoryCounts(categoryMap);
    setColorCounts(colorMap);
  }, [q, price, selectedCategories, selectedColors, allProducts]);

  const handleFilter = () => {
    const params = new URLSearchParams();

    if (q) params.set('q', q);
    if (selectedCategories.length)
      params.set('categories', selectedCategories.join(','));
    if (selectedColors.length) params.set('color', selectedColors.join(','));

    if (minPrice && maxPrice) {
      params.set('price', `${minPrice}-${maxPrice}`);
    }

    router.push(`/search?${params.toString()}`);
  };
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
      <div className="flex gap-4">
        <button
          onClick={() => handleSort('name')}
          className={`px-4 py-2 rounded-lg ${
            sortType === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Sort by Name
        </button>
        <button
          onClick={() => handleSort('price')}
          className={`px-4 py-2 rounded-lg ${
            sortType === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Sort by Price
        </button>
      </div>

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
                  className="w-28 h-10 rounded-md border p-2"
                  placeholder="Min"
                />
              </div>
              <span className="pt-8">&ndash;</span>
              <div className="flex flex-col">
                <p className="text-sm pb-1">Max Price</p>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-28 h-10 rounded-md border p-2"
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
          </div>

          <div>
            <p className="font-semibold pb-2">Product Categories</p>
            <ul>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <li
                  key={category}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    className="accent-project-primary"
                    checked={selectedCategories.includes(category)}
                    onChange={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      )
                    }
                  />
                  <label className="flex justify-between w-full">
                    <span>{category}</span>{' '}
                    <span className="text-gray-400">({count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold pb-2">Filter by Color</p>
            <ul>
              {Object.entries(colorCounts).map(([color, count]) => (
                <li
                  key={color}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    className="accent-project-primary"
                    checked={selectedColors.includes(color)}
                    onChange={() =>
                      setSelectedColors((prev) =>
                        prev.includes(color)
                          ? prev.filter((c) => c !== color)
                          : [...prev, color]
                      )
                    }
                  />
                  <label className="flex justify-between w-full">
                    <span>{color}</span>{' '}
                    <span className="text-gray-400">({count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-8 w-full max-w-5xl">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p>No matching results found.</p>
          ) : (
            <ul className="flex gap-y-8 gap-x-6 flex-wrap">
              {filteredProducts
                .filter((p) => p.amount > 0)
                .map((product) => (
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
                    image={product.image}
                  />
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
