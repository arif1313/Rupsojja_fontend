import { useEffect, useState } from "react";

const images = [
  "https://source.unsplash.com/1600x600/?fashion,women",
  "https://source.unsplash.com/1600x600/?makeup",
  "https://source.unsplash.com/1600x600/?dress"
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-64 md:h-96 overflow-hidden">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Carousel;
