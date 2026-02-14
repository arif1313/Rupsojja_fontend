import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      image: 'https://i.ibb.co.com/qMsBF8Vy/elegant-pearl-necklace-earring-set-green-velvet-1082961-99.jpg',
      title: 'Summer Collection 2024',
      subtitle: 'Up to 50% Off on Selected Items',
      buttonText: 'Shop Now',
    },
    {
      id: 2,
      image: 'https://i.ibb.co.com/tMsNmYwF/realistic-jewelry-composition-with-earrings-brooch-rings-with-jewels-stands-silver-necklace-974629-7.jpg',
      title: 'Luxury Jewelry',
      subtitle: 'Exquisite Designs for Every Occasion',
      buttonText: 'Explore',
    },
    {
      id: 3,
      image: 'https://i.ibb.co.com/JFvGMpH9/queen-crown-still-life.jpg',
      title: 'New Arrivals',
      subtitle: 'Discover the Latest Trends',
      buttonText: 'View Collection',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="relative h-[500px] md:h-[600px] overflow-hidden">
  {slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 transition-opacity duration-1000 ${
        index === currentSlide ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
              {slide.subtitle}
            </p>
            <button className="bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition-all transform hover:scale-105 animate-slide-up">
              {slide.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Navigation Buttons */}
  <button
    onClick={prevSlide}
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
  >
    <ChevronLeft size={24} />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-all"
  >
    <ChevronRight size={24} />
  </button>

  {/* Indicators */}
  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full transition-all ${
          index === currentSlide
            ? 'bg-pink-600 w-6'
            : 'bg-white bg-opacity-50'
        }`}
      />
    ))}
  </div>
</div>
  );
};

export default HeroCarousel;