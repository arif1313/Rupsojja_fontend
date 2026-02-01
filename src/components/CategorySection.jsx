const categories = [
  { name: "Skincare", img: "https://i.ibb.co.com/x8qc3qjy/woman-using-face-roller-skincare.jpg" },
  { name: "Makeup", img: "https://i.ibb.co.com/1YGBGFvM/various-cosmetics-types-scattered-beige-table.jpg" },
  { name: "Perfume", img: "https://i.ibb.co.com/x8hbq8F9/vector-3d-realistic-perfume-bottle-women-shiny-glass-container-with-pink-liquid-33099-1226.jpg" },
  { name: "Haircare", img: "https://i.ibb.co.com/1t1NDr6b/woman-with-black-hair-holding-hair-care-product.jpg" },
];

const CategorySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Shop by Beauty Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer">
            <img
              src={cat.img}
              alt={cat.name}
              className="rounded-lg h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <p className="text-center mt-2 font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
