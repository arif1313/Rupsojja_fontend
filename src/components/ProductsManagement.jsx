import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, Filter } from 'lucide-react';

const ProductsManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Diamond Necklace',
      price: 299.99,
      originalPrice: 399.99,
      category: 'Jewelry',
      stock: 15,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=100',
    },
    {
      id: 2,
      name: 'Summer Dress',
      price: 89.99,
      originalPrice: 119.99,
      category: 'Clothing',
      stock: 23,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=100',
    },
    {
      id: 3,
      name: 'Gold Earrings',
      price: 149.99,
      originalPrice: 199.99,
      category: 'Jewelry',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=100',
    },
    {
      id: 4,
      name: 'Designer Handbag',
      price: 249.99,
      originalPrice: 299.99,
      category: 'Accessories',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=100',
    },
    {
      id: 5,
      name: 'Silk Blouse',
      price: 79.99,
      originalPrice: 99.99,
      category: 'Clothing',
      stock: 12,
      image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=100',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = ['all', 'Jewelry', 'Clothing', 'Accessories', 'Shoes'];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Scroll to edit form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <Link
          to="/admin/add-product"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      {/* Edit Form */}
      {editingProduct && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedProduct = {
              id: editingProduct.id,
              name: formData.get('name'),
              price: parseFloat(formData.get('price')),
              originalPrice: parseFloat(formData.get('originalPrice')) || null,
              category: formData.get('category'),
              stock: parseInt(formData.get('stock')),
              image: editingProduct.image,
            };
            handleUpdate(updatedProduct);
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                defaultValue={editingProduct.name}
                placeholder="Product Name"
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                type="number"
                name="price"
                defaultValue={editingProduct.price}
                placeholder="Price"
                step="0.01"
                className="border rounded-lg px-4 py-2"
                required
              />
              <input
                type="number"
                name="originalPrice"
                defaultValue={editingProduct.originalPrice || ''}
                placeholder="Original Price"
                step="0.01"
                className="border rounded-lg px-4 py-2"
              />
              <select
                name="category"
                defaultValue={editingProduct.category}
                className="border rounded-lg px-4 py-2"
                required
              >
                {categories.filter(c => c !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="number"
                name="stock"
                defaultValue={editingProduct.stock}
                placeholder="Stock"
                className="border rounded-lg px-4 py-2"
                required
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Image</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' :
                      product.stock > 5 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-700 p-1"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsManagement;