import React, { useState, useEffect } from 'react';
import HeroCarousel from './components/HeroCarouse';
import CategorySection from './components/CategorySection';
import ProductGrid from './components/ProductGrid';
import FeaturedProducts from './components/FeaturedProducts';



const Home2 = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Mock data - In a real app, this would come from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Diamond Necklace',
        price: 299.99,
        originalPrice: 399.99,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500',
        category: 'jewelry',
        rating: 4.8,
      },
      {
        id: 2,
        name: 'Summer Dress',
        price: 89.99,
        originalPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500',
        category: 'clothing',
        rating: 4.5,
      },
      {
        id: 3,
        name: 'Gold Earrings',
        price: 149.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500',
        category: 'jewelry',
        rating: 4.9,
      },
      {
        id: 4,
        name: 'Designer Handbag',
        price: 249.99,
        originalPrice: 299.99,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500',
        category: 'accessories',
        rating: 4.7,
      },
      {
        id: 5,
        name: 'Silk Blouse',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=500',
        category: 'clothing',
        rating: 4.4,
      },
      {
        id: 6,
        name: 'Pearl Bracelet',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500',
        category: 'jewelry',
        rating: 4.6,
      },
    ];

    setProducts(mockProducts);
    setFeaturedProducts(mockProducts.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel */}
      <section className="mb-12">
        <HeroCarousel />
      </section>

      {/* Category Section */}
      <section className="mb-16 px-4">
        <CategorySection />
      </section>

      {/* Products Section */}
      <section className="mb-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16 px-4">
        <FeaturedProducts products={featuredProducts} />
      </section>

      {/* Newsletter Section */}
      <section className="bg-pink-50 py-12 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for exclusive offers and style tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home2;