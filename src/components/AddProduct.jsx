import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../Api/ProductApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    tags: "",
    sizes: [],
    colors: [],
  });

  const categories = ["Jewelry", "Clothing", "Accessories", "Shoes", "Bags", "Beauty"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Red", "Blue", "Gold", "Silver", "Pink"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleArrayValue = (value, field) => {
    if (formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.name.length === 0) newErrors.name = "Product name is required";
    if (formData.name.length > 20) newErrors.name = "Max 20 characters allowed";

    if (formData.description.length < 30)
      newErrors.description = "Description must be at least 30 characters";

    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Enter valid price";

    if (!formData.category) newErrors.category = "Category required";

    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = "Enter valid stock quantity";

    if (formData.sizes.length === 0 && formData.colors.length === 0)
      newErrors.variants = "Select at least one size or color";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const formattedProduct = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        variants: [
          ...formData.sizes.map((size) => ({ type: "size", value: size })),
          ...formData.colors.map((color) => ({ type: "color", value: color })),
        ],
        inventory: {
          quantity: Number(formData.stock),
          inStock: Number(formData.stock) > 0,
        },
      };

      await createProduct(formattedProduct);

      alert("✅ Product Added Successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("❌ Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Name */}
          <div>
            <label className="block mb-2 font-medium">Product Name *</label>
            <input
              type="text"
              name="name"
              maxLength={20}
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">Description *</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Price + Stock */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 font-medium">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="cotton, casual, summer"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block mb-3 font-medium">Sizes</label>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleArrayValue(size, "sizes")}
                  className={`px-4 py-2 rounded-lg border ${
                    formData.sizes.includes(size)
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block mb-3 font-medium">Colors</label>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => toggleArrayValue(color, "colors")}
                  className={`px-4 py-2 rounded-lg border ${
                    formData.colors.includes(color)
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
            {errors.variants && (
              <p className="text-red-500 text-sm mt-2">{errors.variants}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-3 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;