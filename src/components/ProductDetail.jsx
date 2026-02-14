import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, Shield, RefreshCw, Heart, Share2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data
  const product = {
    id: 1,
    name: 'Premium Diamond Necklace',
    price: 299.99,
    originalPrice: 399.99,
    description: 'A stunning diamond necklace featuring brilliant cut diamonds set in 14k white gold. Perfect for special occasions and everyday elegance.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w-800',
    ],
    category: 'jewelry',
    rating: 4.8,
    reviews: 128,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      '14k White Gold',
      'Diamond Clarity: VS1',
      'Total Carat Weight: 1.5ct',
      'Chain Length: 18 inches',
      'Lobster Clasp Closure',
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="flex space-x-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? 'border-pink-600'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={img}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Features:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-pink-600 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size:</h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-pink-600 bg-pink-50 text-pink-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="mb-8">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800"
                >
                  −
                </button>
                <span className="px-4 py-3 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-pink-600 text-white py-3 px-8 rounded-lg hover:bg-pink-700 transition-colors font-semibold text-lg">
                Add to Cart
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Heart size={24} className="text-gray-600" />
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <Share2 size={24} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t">
            <div className="flex flex-col items-center text-center">
              <Truck size={32} className="text-gray-400 mb-2" />
              <span className="text-sm font-semibold">Free Shipping</span>
              <span className="text-xs text-gray-500">Over $100</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield size={32} className="text-gray-400 mb-2" />
              <span className="text-sm font-semibold">2-Year Warranty</span>
              <span className="text-xs text-gray-500">Quality Guarantee</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCw size={32} className="text-gray-400 mb-2" />
              <span className="text-sm font-semibold">Easy Returns</span>
              <span className="text-xs text-gray-500">30 Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;