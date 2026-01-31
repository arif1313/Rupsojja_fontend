import { useState } from "react";
import ProductCard from "./ProductCard";

const products = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  title: `Ladies Product ${i + 1}`,
  price: 1200 + i * 10,
  img: "https://source.unsplash.com/400x400/?fashion,women"
}));

const ProductList = () => {
  const [page, setPage] = useState(1);
  const perPage = 8;

  const start = (page - 1) * perPage;
  const current = products.slice(start, start + perPage);
  const totalPage = Math.ceil(products.length / perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {current.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>{page} / {totalPage}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPage}
          className="px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
