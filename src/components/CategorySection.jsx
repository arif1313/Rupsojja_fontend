import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500',
      count: '45 Items',
      link: '/products?category=dresses',
    },
    {
      id: 2,
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500',
      count: '120 Items',
      link: '/products?category=jewelry',
    },
    {
      id: 3,
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500',
      count: '67 Items',
      link: '/products?category=bags',
    },
    {
      id: 4,
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500',
      count: '89 Items',
      link: '/products?category=shoes',
    },
    {
      id: 5,
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=500',
      count: '156 Items',
      link: '/products?category=accessories',
    },
    {
      id: 6,
      name: 'Beauty',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500',
      count: '78 Items',
      link: '/products?category=beauty',
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of women's fashion and jewelry
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
              <p className="text-gray-200 text-sm">{category.count}</p>
            </div>
            <div className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </Link>
        ))}
      </div>

      {/* Featured Jewelry Section */}
      {/* <div className="mt-16  ">
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="text-3xl font-bold mb-4">
                Exclusive Jewelry Collection
              </h3>
              <p className="text-gray-600 mb-6">
                Handcrafted jewelry pieces that complement your style. 
                From delicate necklaces to statement earrings, find your perfect match.
              </p>
              <Link
                to="/products?category=jewelry"
                className="inline-flex items-center bg-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
              >
                Shop Jewelry
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-pink-600 font-bold">💎</span>
                  </div>
                  <h4 className="font-semibold">Diamonds</h4>
                  <p className="text-sm text-gray-500">Premium quality</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-purple-600 font-bold">✨</span>
                  </div>
                  <h4 className="font-semibold">Gold & Silver</h4>
                  <p className="text-sm text-gray-500">Pure materials</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-blue-600 font-bold">🌟</span>
                  </div>
                  <h4 className="font-semibold">Pearls</h4>
                  <p className="text-sm text-gray-500">Elegant designs</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-green-600 font-bold">💍</span>
                  </div>
                  <h4 className="font-semibold">Custom Made</h4>
                  <p className="text-sm text-gray-500">Personalized pieces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CategorySection;