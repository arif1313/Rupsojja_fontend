import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const CategorySection = ({ onCategorySelect }) => {
  const categories = [
    { id: 0, name: 'All Products', value: '' },
    { id: 1, name: 'Earrings', value: 'earrings' },
    { id: 2, name: 'Bracelet', value: 'bracelet' },
    { id: 3, name: 'Anklets', value: 'anklets' },
    { id: 4, name: 'Jewelry Set', value: 'jewelry-set' },
    { id: 5, name: 'Ring', value: 'ring' },
    { id: 6, name: 'Cosmetics', value: 'cosmetics' },
    { id: 7, name: 'Fake-Nail', value: 'fake-nail' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('');


  const handleCategoryClick = (categoryValue) => {
  setSelectedCategory(categoryValue); // update local UI
  if (onCategorySelect) onCategorySelect(categoryValue); // notify parent
};

  return (
    <div className="container mx-auto px-4 py-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        slidesPerView={4}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 4, spaceBetween: 18 },
          480: { slidesPerView: 4, spaceBetween: 12 },
          640: { slidesPerView: 5, spaceBetween: 15 },
          768: { slidesPerView: 5, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 18 },
          1280: { slidesPerView: 7, spaceBetween: 20 },
        }}
        className="category-swiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <button
              onClick={() => handleCategoryClick(category.value)}
              className={`block group ${
                selectedCategory === category.value ? 'border-pink-500' : ''
              }`}
            >
              {/* Smaller Circular Card */}
              <div className="flex justify-center mb-2">
                <img
                  src={`https://images.unsplash.com/100x100/?${category.name}`}
                  alt={category.name}
                  className="w-12 h-12 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-center text-xs xs:text-sm sm:text-sm font-medium text-gray-700 mt-1 group-hover:text-pink-600 transition-colors duration-300">
                {category.name}
              </h3>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        @media (min-width: 320px) {
          .xs\\:w-16 {
            width: 4rem;
          }
          .xs\\:h-16 {
            height: 4rem;
          }
          .xs\\:text-sm {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CategorySection;
