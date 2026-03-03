// components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isAdding) return;
    
    setIsAdding(true);
    const result = await addToCart(product._id, 1);
    
    if (result.success) {
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error(result.error || 'Failed to add to cart');
    }
    
    setIsAdding(false);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const isOutOfStock = product.inventory?.quantity === 0;

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="group relative bg-slate-200 rounded-lg overflow-hidden 
                      shadow-sm hover:shadow-xl 
                      transition-all duration-300">

        {/* Product Image */}
        <div className="relative overflow-hidden h-32 md:h-56 lg:h-64">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover 
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

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Out of Stock
              </span>
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
              ${product.price?.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-gray-500 line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className={`
              w-full 
              py-2 px-3 text-xs
              md:py-3 md:px-4 md:text-sm
              lg:py-3.5 lg:text-base
              rounded-md font-medium
              transition-all duration-200
              flex items-center justify-center gap-2
              ${
                isOutOfStock
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isAdding
                  ? 'bg-gray-500 cursor-wait'
                  : 'bg-black hover:bg-gray-800 active:scale-95'
              }
              text-white
            `}
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
            {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;