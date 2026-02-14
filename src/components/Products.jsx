import React, { useState } from 'react';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProductGrid from './ProductGrid';


const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Diamond Necklace',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500',
      category: 'jewelry',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Summer Dress',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500',
      category: 'clothing',
      rating: 4.5,
    },
    {
      id: 3,
      name: 'Gold Earrings',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500',
      category: 'jewelry',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Designer Handbag',
      price: 249.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500',
      category: 'accessories',
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Silk Blouse',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500',
      category: 'clothing',
      rating: 4.4,
    },
    {
      id: 6,
      name: 'Pearl Bracelet',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500',
      category: 'jewelry',
      rating: 4.6,
    },
    {
      id: 7,
      name: 'Leather Boots',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500',
      category: 'shoes',
      rating: 4.3,
    },
    {
      id: 8,
      name: 'Statement Necklace',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500',
      category: 'jewelry',
      rating: 4.8,
    },
    {
      id: 9,
      name: 'Evening Gown',
      price: 399.99,
      originalPrice: 499.99,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500',
      category: 'dresses',
      rating: 4.9,
    },
    {
      id: 10,
      name: 'Silver Ring',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500',
      category: 'jewelry',
      rating: 4.5,
    },
    {
      id: 11,
      name: 'Wool Scarf',
      price: 39.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=500',
      category: 'accessories',
      rating: 4.2,
    },
    {
      id: 12,
      name: 'Cocktail Dress',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500',
      category: 'dresses',
      rating: 4.6,
    },
  ];

  const categories = [
    'All Categories',
    'Dresses',
    'Jewelry',
    'Bags',
    'Shoes',
    'Accessories',
  ];

  const filters = {
    price: [
      { label: 'Under $50', value: 'under-50' },
      { label: '$50 - $100', value: '50-100' },
      { label: '$100 - $200', value: '100-200' },
      { label: 'Over $200', value: 'over-200' },
    ],
    colors: ['Black', 'White', 'Red', 'Blue', 'Gold', 'Silver'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Shop Products</h1>
        <p className="text-gray-600">
          Discover our collection of premium women's fashion and jewelry
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - Mobile */}
        {/* <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full bg-white border rounded-lg px-4 py-3"
          >
            <div className="flex items-center">
              <Filter size={20} className="mr-2" />
              <span>Filters</span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
        </div> */}

        {/* Filters Sidebar - Desktop */}
        {/* <div
          className={`${
            showFilters ? 'block' : 'hidden'
          } lg:block lg:w-1/4 space-y-6`}
        >
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="block w-full text-left px-2 py-2 rounded hover:bg-pink-50 hover:text-pink-600 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Price Range</h3>
            <div className="space-y-2">
              {filters.price.map((price) => (
                <label key={price.value} className="flex items-center">
                  <input
                    type="radio"
                    name="price"
                    value={price.value}
                    className="mr-3"
                  />
                  <span>{price.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {filters.colors.map((color) => (
                <button
                  key={color}
                  className={`px-3 py-1 border rounded-full text-sm ${
                    color === 'Gold'
                      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      : color === 'Silver'
                      ? 'bg-gray-100 text-gray-800 border-gray-300'
                      : 'bg-gray-50 text-gray-800 border-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        {/* Products Grid */}
        <div className="">
          {/* Toolbar */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="mr-4">{products.length} products</span>
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid'
                        ? 'bg-pink-100 text-pink-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border-l ${
                      viewMode === 'list'
                        ? 'bg-pink-100 text-pink-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products */}
          <ProductGrid products={products} columns={viewMode === 'grid' ? 4 : 1} />

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Previous
              </button>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 rounded-lg ${
                    num === 1
                      ? 'bg-pink-600 text-white'
                      : 'border hover:bg-gray-50'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;