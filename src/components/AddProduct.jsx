import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { createProduct } from "../Api/ProductApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const categories = [
    "Jewelry",
    "Clothing",
    "Accessories",
    "Shoes",
    "Bags",
    "Beauty",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Red", "Blue", "Gold", "Silver", "Pink"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;

    if (e.target.checked) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    } else {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          ...formData.sizes.map((size) => ({
            type: "size",
            value: size,
          })),
          ...formData.colors.map((color) => ({
            type: "color",
            value: color,
          })),
        ],

        inventory: {
          quantity: Number(formData.stock),
          inStock: Number(formData.stock) > 0,
        },
      };

      await createProduct(formattedProduct);

      alert("✅ Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            <div>
              <label className="block mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Tags (comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="new, trending, summer"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Sizes */}
            <div>
              <label className="block mb-2">Sizes</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <label key={size}>
                    <input
                      type="checkbox"
                      value={size}
                      onChange={(e) => handleArrayChange(e, "sizes")}
                    />{" "}
                    {size}
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block mb-2">Colors</label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <label key={color}>
                    <input
                      type="checkbox"
                      value={color}
                      onChange={(e) => handleArrayChange(e, "colors")}
                    />{" "}
                    {color}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;