import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Added to cart:', product.id);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="group relative bg-white rounded-lg overflow-hidden 
                      shadow-sm hover:shadow-xl 
                      transition-all duration-300">

        {/* Product Image */}
        <div className="relative overflow-hidden h-44 md:h-56 lg:h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover 
                       group-hover:scale-110 
                       transition-transform duration-500"
          />

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute top-2 right-2 
                       bg-white p-1.5 md:p-2
                       rounded-full shadow-md 
                       hover:scale-110 transition"
          >
            <Heart
              size={16}
              className={`md:w-5 md:h-5 ${
                isLiked
                  ? 'fill-pink-600 text-pink-600'
                  : 'text-gray-600'
              }`}
            />
          </button>

          {/* Sale Badge */}
          {product.originalPrice && (
            <div className="absolute top-2 left-2 
                            bg-red-500 text-white 
                            text-[10px] md:text-xs
                            font-bold px-2 py-0.5 md:px-3 md:py-1
                            rounded">
              SALE
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-2 md:p-4">

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 
                         text-xs md:text-sm lg:text-base
                         mb-1 md:mb-2
                         line-clamp-1
                         group-hover:text-pink-600 
                         transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <span className="text-sm md:text-base font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="
              w-full 
              bg-black text-white 
              py-2 px-3 text-xs
              md:py-3 md:px-4 md:text-sm
              lg:py-3.5 lg:text-base
              rounded-md font-medium
              hover:bg-gray-800 
              transition-all duration-200
              active:scale-95
              flex items-center justify-center gap-2
            "
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            Add to Cart
          </button>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
