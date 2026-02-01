import { useEffect, useState } from "react";

const images = [
  "https://i.ibb.co/3WJ8wNz/image1.jpg",
  "https://i.ibb.co/0tFfYwP/image2.jpg",
  "https://i.ibb.co/d2hP1vZ/image3.jpg"
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
   <section className="relative h-96 md:h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('https://i.ibb.co.com/gMQTN2FR/beauty-cream-tube-mockup-skincare-with-podium-natural-background-604638-1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          Welcome to Our Beauty World
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Explore the latest trends in women's Beauty, makeup, and dresses.
        </p>
        <button className="bg-pink-600 hover:bg-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Carousel;
