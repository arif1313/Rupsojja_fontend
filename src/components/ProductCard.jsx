import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product.id);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
   
    <Link to={`/product/${product.id}`}>
      <div
        className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Quick Actions */}
          <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <button
              onClick={handleLike}
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
            >
              <Heart
                size={18}
                className={isLiked ? 'fill-pink-600 text-pink-600' : 'text-gray-600'}
              />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
            >
              <ShoppingBag size={18} className="text-gray-600" />
            </button>
          </div>

          {/* Sale Badge */}
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}

          {/* Quick View Button */}
          <button className={`absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-sm font-semibold transition-all duration-300 transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}>
            Quick View
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-sm font-semibold text-red-600">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;