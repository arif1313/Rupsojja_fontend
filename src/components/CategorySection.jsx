import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useCategory } from "../context/CategoryContext"
const CategorySection = ({ onCategorySelect }) => {
    const { selectedCategory, setSelectedCategory } = useCategory();


  const categories = [
    { id: 0, name: "All", value: "", image: "/earring.png" },
    { id: 1, name: "Earrings", value: "earrings", image: "/earring.png" },
    { id: 2, name: "Bracelet", value: "bracelet", image: "/brecelet.png" },
    { id: 3, name: "Anklets", value: "anklets", image: "/payel.png" },
    { id: 4, name: "Jewelry Set", value: "jewelry-set", image: "/jewelrySet.png" },
    { id: 5, name: "Ring", value: "ring", image: "/ring.png" },
    { id: 6, name: "Cosmetics", value: "cosmetics", image: "/cosmetics.png" },
    { id: 7, name: "Fake Nail", value: "fake-nail", image: "/fakenails.png" },
  ];


  return (
    <div className="container mx-auto px-4 py-6 bg-white">
      <Swiper
        spaceBetween={16}   // ✅ Mobile gap
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 5, spaceBetween: 20 },
          768: { slidesPerView: 6, spaceBetween: 24 },
          1024: { slidesPerView: 8, spaceBetween: 24 },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex flex-col items-center">

              {/* ✅ Full Circle Image */}
              <div
                onClick={() => setSelectedCategory(category.value)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "border-pink-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* ✅ Category Name Below Image */}
              <span
                className={`mt-2 text-[11px] md:text-sm text-center font-medium ${
                  selectedCategory === category.value
                    ? "text-pink-600"
                    : "text-gray-700"
                }`}
              >
                {category.name}
              </span>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySection;
