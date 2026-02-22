import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProductGrid from './ProductGrid';

const Products = () => {

//
const [selectedSize, setSelectedSize] = useState('');
const [selectedColor, setSelectedColor] = useState('');
const [selectedBrand, setSelectedBrand] = useState('');
const [selectedRating, setSelectedRating] = useState('');
const [selectedStock, setSelectedStock] = useState('');
const [selectedDiscount, setSelectedDiscount] = useState('');
//
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [selectedCategory, setSelectedCategory] = useState('');
const [selectedPrice, setSelectedPrice] = useState('');

  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // ✅ NEW STATE
  const [visibleCount, setVisibleCount] = useState(8);

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


  const filteredProducts = products.filter(product => {

  if (selectedCategory && product.category !== selectedCategory) {
    return false;
  }

  if (selectedPrice === 'under-100' && product.price >= 100) {
    return false;
  }

  if (selectedPrice === 'over-100' && product.price < 100) {
    return false;
  }

  return true;
});

  // ✅ Only show limited products
 const visibleProducts = filteredProducts.slice(0, visibleCount);




  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">

          {/* Top Controls */}
          <div className="flex flex-row md:items-center md:justify-between mb-6 gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              Filters
            </button>

             <button
             
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              Stok Out
            </button>
          </div>

          {/* Products */}
          <ProductGrid products={visibleProducts} columns={4} />

          {/* ✅ Load More Button */}
          {visibleCount < products.length && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Overlay */}
{isDrawerOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-40"
    onClick={() => setIsDrawerOpen(false)}
  />
)}

{/* Drawer */}
<div
  className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
    isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
>
  <div className="p-6 h-full flex flex-col overflow-y-auto">
    <h2 className="text-xl font-semibold mb-6">Filters</h2>

    {/* Category Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Category</h3>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="jewelry">Jewelry</option>
        <option value="clothing">Clothing</option>
        <option value="dresses">Dresses</option>
        <option value="accessories">Accessories</option>
        <option value="shoes">Shoes</option>
      </select>
    </div>

    {/* Price Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Price</h3>
      <select
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="under-100">Under $100</option>
        <option value="100-200">$100 - $200</option>
        <option value="over-200">Over $200</option>
      </select>
    </div>

    {/* Size Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Size</h3>
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="s">Small (S)</option>
        <option value="m">Medium (M)</option>
        <option value="l">Large (L)</option>
        <option value="xl">Extra Large (XL)</option>
      </select>
    </div>

    {/* Color Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Color</h3>
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="black">Black</option>
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="pink">Pink</option>
      </select>
    </div>

    {/* Brand Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Brand</h3>
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="zara">Zara</option>
        <option value="hm">H&M</option>
        <option value="local">Local Brand</option>
      </select>
    </div>

    {/* Rating Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Rating</h3>
      <select
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="4">4★ & Above</option>
        <option value="3">3★ & Above</option>
      </select>
    </div>

    {/* Availability */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Availability</h3>
      <select
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="in-stock">In Stock</option>
        <option value="out-stock">Out of Stock</option>
      </select>
    </div>

    {/* Discount Filter */}
    <div className="mb-6">
      <h3 className="font-medium mb-3">Discount</h3>
      <select
        value={selectedDiscount}
        onChange={(e) => setSelectedDiscount(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">All</option>
        <option value="10">10% & Above</option>
        <option value="20">20% & Above</option>
        <option value="50">50% & Above</option>
      </select>
    </div>

    <div className="mt-auto">
      <button
        onClick={() => {
          setIsDrawerOpen(false);
          setVisibleCount(8);
        }}
        className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
      >
        Apply Filter
      </button>
    </div>
  </div>
</div>


    </div>
  );
};

export default Products;
