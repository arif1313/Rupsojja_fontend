import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

const FeaturedProducts = ({ products }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <p className="text-gray-600 mt-2">Most popular products this week</p>
        </div>
        <button className="flex items-center text-pink-600 hover:text-pink-700 font-semibold">
          View All
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;