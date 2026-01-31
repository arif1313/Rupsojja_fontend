const ProductCard = ({ title, price, img }) => {
  return (
    <div className="border rounded-lg p-3 hover:shadow-lg transition">
      <img src={img} className="h-48 w-full object-cover rounded" />
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="text-pink-500 font-bold">৳ {price}</p>
    </div>
  );
};

export default ProductCard;
