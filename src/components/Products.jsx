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
     

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Products Grid */}
        <div className="">
          {/* Toolbar */}
         {/* Toolbar */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
  
  {/* Left Side */}
  <div className="flex items-center gap-4">
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
    >
      <Filter size={18} />
      Filters
    </button>

    <span className="text-gray-600 text-sm">
      Showing {products.length} products
    </span>
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">
    
    {/* Sort */}
    <div className="relative">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="appearance-none border rounded-lg px-4 py-2 pr-8 focus:outline-none"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
      <ChevronDown
        size={16}
        className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
      />
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