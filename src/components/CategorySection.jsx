import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const CategorySection = () => {
  const categories = [
    {
      id: 0,
      name: 'All Products',
      image: 'https://images.unsplash.com/photo-1581291519195-ef11498d1cf6?auto=format&fit=crop&w=500',
      link: '/products',
    },
    {
      id: 1,
      name: 'Earrings',
      image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=500',
      link: '/products?category=earrings',
    },
    {
      id: 2,
      name: 'Bracelet',
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500',
      link: '/products?category=bracelet',
    },
    {
      id: 3,
      name: 'Anklets',
      image: 'https://images.unsplash.com/photo-1611652022419-a9410f743dfb?auto=format&fit=crop&w=500',
      link: '/products?category=anklets',
    },
    {
      id: 4,
      name: 'Jewelry Set',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500',
      link: '/products?category=jewelry-set',
    },
    {
      id: 5,
      name: 'Ring',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500',
      link: '/products?category=ring',
    },
    {
      id: 6,
      name: 'Cosmetics',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500',
      link: '/products?category=cosmetics',
    },
    {
      id: 7,
      name: 'Fake-Nail',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500',
      link: '/products?category=fake-nail',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-2">Categories</h2>
        <div className="w-20 h-0.5 bg-pink-500 mx-auto"></div>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={4} // mobile default 4 slides
        autoplay={{ 
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 4, spaceBetween: 10 },
          480: { slidesPerView: 4, spaceBetween: 12 },
          640: { slidesPerView: 5, spaceBetween: 15 },
          768: { slidesPerView: 5, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 18 },
          1280: { slidesPerView: 7, spaceBetween: 20 },
        }}
        className="category-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <Link
              to={category.link}
              className={`block group ${index === 0 ? 'border-pink-500' : ''}`}
            >
              {/* Smaller Circular Card */}
              <div className="flex justify-center mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-12 h-12 xs:w-16 xs:h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-center text-xs xs:text-sm sm:text-sm font-medium text-gray-700 mt-1 group-hover:text-pink-600 transition-colors duration-300">
                {category.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for xs breakpoint */}
      <style jsx>{`
        @media (min-width: 320px) {
          .xs\\:w-16 { width: 4rem; }
          .xs\\:h-16 { height: 4rem; }
          .xs\\:text-sm { font-size: 0.875rem; }
        }
      `}</style>
    </div>
  );
};

export default CategorySection;
