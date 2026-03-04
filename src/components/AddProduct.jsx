import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { createProduct } from "../Api/ProductApi";

const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    tags: "",
    sizes: [],
    colors: [],
    image: "" // This will store the main image URL from ImgBB
  });

  const categories = ["Jewelry", "Clothing", "Accessories", "Shoes", "Bags", "Beauty"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Black", "White", "Red", "Blue", "Gold", "Silver", "Pink"];

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Toggle array values for sizes and colors
  const toggleArrayValue = (value, field) => {
    const currentArray = formData[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    setFormData({
      ...formData,
      [field]: newArray
    });

    // Clear variants error if any
    if (errors.variants) {
      setErrors({
        ...errors,
        variants: null
      });
    }
  };

  // Upload single image to ImgBB
  const uploadImageToImgBB = async (file) => {
    const formDataImg = new FormData();
    formDataImg.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=e0ce6946d1f76fe9c8a4a3d506dca386`,
        {
          method: "POST",
          body: formDataImg,
        }
      );
      const data = await res.json();

      if (data.success) {
        return data.data.url; // Return the ImgBB URL
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      throw error;
    }
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Check total images limit (max 5)
    if (imageFiles.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Store files for later upload
    setImageFiles(prev => [...prev, ...files]);

    // Clear image errors
    if (errors.images) {
      setErrors({
        ...errors,
        images: null
      });
    }

    // If this is the first image, set it as main and upload immediately
    if (imageFiles.length === 0 && files.length > 0) {
      try {
        setUploadingImages(true);
        setUploadProgress(0);
        
        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 100);

        const imageUrl = await uploadImageToImgBB(files[0]);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        setFormData(prev => ({
          ...prev,
          image: imageUrl // Store main image URL
        }));
        
        setImageUrls(prev => [...prev, imageUrl]);
        toast.success("Main image uploaded successfully!");
        
        setTimeout(() => {
          setUploadProgress(0);
          setUploadingImages(false);
        }, 1000);
        
      } catch (error) {
        toast.error("Failed to upload main image");
        setUploadingImages(false);
        setUploadProgress(0);
      }
    }
  };

  // Remove image
  const removeImage = async (index) => {
    // Remove preview
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    
    // Remove file
    const removedFile = imageFiles[index];
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    
    // Remove URL if it exists
    if (imageUrls[index]) {
      setImageUrls(prev => prev.filter((_, i) => i !== index));
    }

    // If removing the main image (index 0)
    if (index === 0) {
      // If there are other images, set the next one as main
      if (imageFiles.length > 1) {
        const nextFile = imageFiles[1];
        try {
          setUploadingImages(true);
          const imageUrl = await uploadImageToImgBB(nextFile);
          setFormData(prev => ({
            ...prev,
            image: imageUrl
          }));
          
          // Update URLs array
          setImageUrls(prev => {
            const newUrls = [...prev];
            newUrls[0] = imageUrl;
            return newUrls;
          });
          
          setUploadingImages(false);
        } catch (error) {
          toast.error("Failed to upload new main image");
          setUploadingImages(false);
        }
      } else {
        // No images left
        setFormData(prev => ({
          ...prev,
          image: ""
        }));
      }
    }

    // Clean up preview URL to avoid memory leaks
    URL.revokeObjectURL(imagePreviews[index]);
  };

  // Upload all remaining images (for multiple images feature if you want to store multiple)
  const uploadAllImages = async () => {
    if (imageFiles.length <= 1) return; // First image already uploaded

    setUploadingImages(true);
    const uploadedUrls = [...imageUrls];
    
    try {
      // Start from index 1 since index 0 is already uploaded
      for (let i = 1; i < imageFiles.length; i++) {
        setUploadProgress(Math.round((i / (imageFiles.length - 1)) * 100));
        
        const imageUrl = await uploadImageToImgBB(imageFiles[i]);
        uploadedUrls[i] = imageUrl;
      }
      
      setImageUrls(uploadedUrls);
      setUploadProgress(100);
      toast.success("All images uploaded successfully!");
      
      setTimeout(() => {
        setUploadProgress(0);
        setUploadingImages(false);
      }, 1000);
      
    } catch (error) {
      toast.error("Failed to upload some images");
      setUploadingImages(false);
      setUploadProgress(0);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData.name.length > 20) {
      newErrors.name = "Name cannot exceed 20 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 30) {
      newErrors.description = "Description must be at least 30 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.stock && formData.stock !== 0) {
      newErrors.stock = "Stock is required";
    } else if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    if (!formData.image) {
      newErrors.images = "Main product image is required";
    }

    if (formData.sizes.length === 0 && formData.colors.length === 0) {
      newErrors.variants = "At least one size or color must be selected";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Scroll to first error
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      // Upload any remaining images if needed (for multiple images feature)
      if (imageFiles.length > 1 && imageUrls.length < imageFiles.length) {
        await uploadAllImages();
      }

      // Prepare payload for API
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category,
        tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag) : [],
        variants: [
          ...formData.sizes.map(size => ({ type: "size", value: size })),
          ...formData.colors.map(color => ({ type: "color", value: color })),
        ],
        inventory: {
          quantity: Number(formData.stock),
          inStock: Number(formData.stock) > 0,
        },
        image: formData.image // Main image URL from ImgBB
      };

      // Call API to create product
      await createProduct(payload);
      
      toast.success("Product created successfully!");
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        tags: "",
        sizes: [],
        colors: [],
        image: ""
      });
      
      // Clear images
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
      setImagePreviews([]);
      setImageFiles([]);
      setImageUrls([]);
      
      // Navigate to products list
      navigate("/admin/products");
      
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-pink-200 rounded-xl p-6 bg-pink-50/30">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Product Images <span className="text-red-500">*</span>
            </label>
            
            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-pink-200 group-hover:border-pink-400 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 
                               flex items-center justify-center text-sm hover:bg-red-600 
                               opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      disabled={loading || uploadingImages}
                    >
                      ×
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 bg-gradient-to-r from-pink-600 to-purple-600 
                                     text-white text-xs px-2 py-1 rounded-full shadow-md">
                        Main
                      </span>
                    )}
                    {imageUrls[index] && (
                      <span className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded-full">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <div className="text-center">
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={loading || uploadingImages || imagePreviews.length >= 5}
              />
              <label
                htmlFor="image-upload"
                className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 
                         text-white rounded-xl cursor-pointer hover:from-pink-700 hover:to-purple-700 
                         transition-all transform hover:scale-105 shadow-lg
                         ${(loading || uploadingImages || imagePreviews.length >= 5) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className="text-xl">📸</span>
                {imagePreviews.length > 0 ? "Add More Images" : "Choose Images"}
              </label>
              <p className="text-sm text-gray-500 mt-3">
                Images will be uploaded to ImgBB • Max 5 images • {imagePreviews.length}/5 selected
              </p>
            </div>

            {errors.images && (
              <p className="text-red-500 text-sm mt-2 error-message flex items-center gap-1">
                <span>⚠️</span> {errors.images}
              </p>
            )}

            {/* Upload Progress Bar */}
            {uploadingImages && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-pink-600 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Uploading to ImgBB... {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          {/* Product Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              maxLength={20}
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-all
                ${errors.name 
                  ? 'border-red-300 bg-red-50 focus:border-red-400' 
                  : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200'
                }`}
              placeholder="e.g., Premium Cotton T-Shirt"
              disabled={loading || uploadingImages}
            />
            <div className="flex justify-between mt-2">
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              <span className="text-sm text-gray-400 ml-auto">
                {formData.name.length}/20
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-all resize-none
                ${errors.description 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200'
                }`}
              placeholder="Describe your product in detail..."
              disabled={loading || uploadingImages}
            />
            <div className="flex justify-between mt-2">
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
              <span className={`text-sm ml-auto ${
                formData.description.length < 30 ? 'text-orange-500' : 'text-green-500'
              }`}>
                {formData.description.length}/30+
              </span>
            </div>
          </div>

          {/* Price + Stock */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`w-full border-2 rounded-xl pl-8 pr-4 py-3 focus:outline-none transition-all
                    ${errors.price 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200'
                    }`}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  disabled={loading || uploadingImages}
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-2">{errors.price}</p>}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-all
                  ${errors.stock 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200'
                  }`}
                placeholder="0"
                min="0"
                disabled={loading || uploadingImages}
              />
              {errors.stock && <p className="text-red-500 text-sm mt-2">{errors.stock}</p>}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-all
                ${errors.category 
                  ? 'border-red-300 bg-red-50' 
                  : 'border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200'
                }`}
              disabled={loading || uploadingImages}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-2">{errors.category}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Tags</label>
            <input
              type="text"
              name="tags"
              placeholder="cotton, casual, summer (comma separated)"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none 
                       focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
              disabled={loading || uploadingImages}
            />
            <p className="text-gray-400 text-sm mt-2">Separate tags with commas</p>
          </div>

          {/* Sizes */}
          <div>
            <label className="block mb-3 font-medium text-gray-700">Available Sizes</label>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleArrayValue(size, "sizes")}
                  disabled={loading || uploadingImages}
                  className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105
                    ${formData.sizes.includes(size)
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-transparent'
                    } ${(loading || uploadingImages) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block mb-3 font-medium text-gray-700">Available Colors</label>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => {
                const colorStyles = {
                  Black: 'bg-black text-white',
                  White: 'bg-white text-gray-900 border-2 border-gray-300',
                  Red: 'bg-red-600 text-white',
                  Blue: 'bg-blue-600 text-white',
                  Gold: 'bg-yellow-500 text-white',
                  Silver: 'bg-gray-400 text-white',
                  Pink: 'bg-pink-500 text-white'
                };
                
                return (
                  <button
                    type="button"
                    key={color}
                    onClick={() => toggleArrayValue(color, "colors")}
                    disabled={loading || uploadingImages}
                    className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105
                      ${colorStyles[color]}
                      ${formData.colors.includes(color) 
                        ? 'ring-4 ring-pink-400 ring-offset-2 shadow-lg' 
                        : 'opacity-80 hover:opacity-100'
                      } ${(loading || uploadingImages) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
            {errors.variants && (
              <p className="text-red-500 text-sm mt-3 error-message">{errors.variants}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-8 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-600 
                       hover:bg-gray-50 hover:border-gray-300 transition-all"
              disabled={loading || uploadingImages}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || uploadingImages || imagePreviews.length === 0}
              className={`px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105
                ${(loading || uploadingImages || imagePreviews.length === 0)
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                } flex items-center gap-2`}
            >
              {uploadingImages ? (
                <>
                  <span className="animate-spin">⚪</span>
                  Uploading to ImgBB... {uploadProgress}%
                </>
              ) : loading ? (
                <>
                  <span className="animate-spin">⚪</span>
                  Creating Product...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>

        {/* Summary Card */}
        {imagePreviews.length > 0 && (
          <div className="mt-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold">📊 Summary:</span>
                <span>{imagePreviews.length} image(s) {imageUrls.length > 0 && '(uploaded)'}</span>
                <span>•</span>
                <span>{formData.sizes.length} size(s)</span>
                <span>•</span>
                <span>{formData.colors.length} color(s)</span>
              </div>
              {formData.image && (
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>Main image uploaded to ImgBB!</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;