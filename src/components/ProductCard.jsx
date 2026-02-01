const ProductCard = ({ title, price, img }) => {
  // Add to Cart button click handler
  const handleAddToCart = () => {
    alert(`${title} added to cart 🛒`);
  };

  return (
    <div className="bg-white border rounded-lg p-3 hover:shadow-lg transition flex flex-col">
      <img
        src={img}
        alt={title}
        className="h-48 w-full object-cover rounded mb-3"
      />

      <h3 className="mt-2 font-semibold text-sm md:text-base">{title}</h3>
      <p className="text-pink-500 font-bold mb-3">৳ {price}</p>

      <button
        onClick={handleAddToCart}
        className="mt-auto bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-sm font-semibold transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
