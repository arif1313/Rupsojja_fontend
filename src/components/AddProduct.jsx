import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    subcategory: '',
    brand: '',
    stock: '',
    sku: '',
    tags: '',
    sizes: [],
    colors: [],
    featured: false,
  });

  const categories = [
    'Jewelry',
    'Clothing',
    'Accessories',
    'Shoes',
    'Bags',
    'Beauty',
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Gold', 'Silver', 'Pink'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
        [field]: formData[field].filter(item => item !== value),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add product logic here
    console.log('Product Data:', formData);
    console.log('Images:', images);
    
    // Show success message
    alert('Product added successfully!');
    
    // Navigate back to products list
    navigate('/admin/products');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., new, trending, summer"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images *
              </label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="text-gray-400 mb-2" size={32} />
                  <span className="text-sm text-gray-600">Click to upload images</span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 5MB</span>
                </label>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <label key={size} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={size}
                      onChange={(e) => handleArrayChange(e, 'sizes')}
                      className="rounded text-pink-600"
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Colors
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <label key={color} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={color}
                      onChange={(e) => handleArrayChange(e, 'colors')}
                      className="rounded text-pink-600"
                    />
                    <span className="text-sm">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Product */}
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="rounded text-pink-600"
                />
                <span className="text-sm font-medium text-gray-700">
                  Mark as Featured Product
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;