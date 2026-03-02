import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { getAllProducts } from "../Api/ProductApi";
import { useSearch } from "../context/SearchContext"; // Added missing import
import axios from "axios"; // Added missing import
import { useCategory } from "../context/CategoryContext";

const Products = () => {

  const { selectedCategory, setSelectedCategory } = useCategory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [selectedDiscount, setSelectedDiscount] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const { searchTerm } = useSearch(); // Added missing hook


  // ✅ Fetch products
  useEffect(() => {  
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        console.log("Products:", data);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  console.log(`selectedCategory ${selectedCategory}`)
    console.log(`searchTerm ${searchTerm}`)
  // ✅ Filtering logic
  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    if (selectedPrice === "under-100" && product.price >= 100) {
      return false;
    }

    if (selectedPrice === "over-200" && product.price <= 200) {
      return false;
    }

    if (selectedStock === "in-stock" && !product.inventory?.inStock) {
      return false;
    }

    if (selectedStock === "out-stock" && product.inventory?.inStock) {
      return false;
    }

    return true;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">

          {/* Top Controls */}
          <div className="flex flex-row md:items-center md:justify-between mb-6 gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              Filters
            </button>

            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              Stock Out
            </button>
          </div>

          {/* ✅ IMPORTANT FIX HERE */}
          <ProductGrid products={visibleProducts} columns={4} />

          {/* Load More */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">All</option>
              <option value="Clothing">Clothing</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="mt-auto">
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                setVisibleCount(8);
              }}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
            >
              Apply Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;