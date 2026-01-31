const categories = [
  { name: "Dresses", img: "https://source.unsplash.com/400x400/?dress" },
  { name: "Makeup", img: "https://source.unsplash.com/400x400/?makeup" },
  { name: "Bags", img: "https://source.unsplash.com/400x400/?bag" },
  { name: "Shoes", img: "https://source.unsplash.com/400x400/?heels" },
];

const CategorySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer">
            <img
              src={cat.img}
              className="rounded-lg h-40 w-full object-cover group-hover:scale-105 transition"
            />
            <p className="text-center mt-2 font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
