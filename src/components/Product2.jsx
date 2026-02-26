





// import React, { useEffect, useState } from 'react';
// import { Filter, ChevronDown } from 'lucide-react';
// import ProductGrid from './ProductGrid';
// import { key } from 'localforage';
// import { getAllProducts } from "../Api/ProductApi"; 
// const Products = () => {

// //
// const [selectedSize, setSelectedSize] = useState('');
// const [selectedColor, setSelectedColor] = useState('');
// const [selectedBrand, setSelectedBrand] = useState('');
// const [selectedRating, setSelectedRating] = useState('');
// const [selectedStock, setSelectedStock] = useState('');
// const [selectedDiscount, setSelectedDiscount] = useState('');
// //
// const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// const [selectedCategory, setSelectedCategory] = useState('');
// const [selectedPrice, setSelectedPrice] = useState('');

//   const [sortBy, setSortBy] = useState('featured');
//   const [showFilters, setShowFilters] = useState(false);

//   // ✅ NEW STATE
//   const [visibleCount, setVisibleCount] = useState(8);
//     const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//       const data = await getAllProducts();
// console.log("Fetched products:", data);
// setProducts(data);
//       } catch (err) {
//         setError("Failed to load products");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

  
//   const filteredProducts = products.filter(product => {

//    if (selectedCategory && product.category !== selectedCategory) {
//      return false;
//    }

//    if (selectedPrice === 'under-100' && product.price >= 100) {
//      return false;
//   }

//   if (selectedPrice === 'over-100' && product.price < 100) {
//      return false;
//   }

//    return true;
//  });

//   // ✅ Only show limited products
//   const visibleProducts = filteredProducts.slice(0, visibleCount);




//   return (

// <div>
//   {visibleProducts.length === 0 ? (
//     <p>No products found</p>
//   ) : (
//     visibleProducts.map((product) => (
//       <p key={product._id}>{product.name}</p>
//     ))
//   )}
// </div>



//   );
// };

// export default Products;
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="w-full">

//           {/* Top Controls */}
//           <div className="flex flex-row md:items-center md:justify-between mb-6 gap-4">
//             <button
//               onClick={() => setIsDrawerOpen(true)}
//               className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               <Filter size={18} />
//               Filters
//             </button>

//              <button
             
//               className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               <Filter size={18} />
//               Stok Out
//             </button>
//           </div>

//           {/* Products */}
//           <ProductGrid products={products} columns={4} />

//           {/* ✅ Load More Button */}
//           {visibleCount < products.length && (
//             <div className="mt-10 flex justify-center">
//               <button
//                 onClick={() => setVisibleCount(prev => prev + 4)}
//                 className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
//               >
//                 Load More
//               </button>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* Overlay */}
// {isDrawerOpen && (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-40 z-40"
//     onClick={() => setIsDrawerOpen(false)}
//   />
// )}

// {/* Drawer */}
// <div
//   className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
//     isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
//   }`}
// >
//   <div className="p-6 h-full flex flex-col overflow-y-auto">
//     <h2 className="text-xl font-semibold mb-6">Filters</h2>

//     {/* Category Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Category</h3>
//       <select
//         value={selectedCategory}
//         onChange={(e) => setSelectedCategory(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="jewelry">Jewelry</option>
//         <option value="clothing">Clothing</option>
//         <option value="dresses">Dresses</option>
//         <option value="accessories">Accessories</option>
//         <option value="shoes">Shoes</option>
//       </select>
//     </div>

//     {/* Price Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Price</h3>
//       <select
//         value={selectedPrice}
//         onChange={(e) => setSelectedPrice(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="under-100">Under $100</option>
//         <option value="100-200">$100 - $200</option>
//         <option value="over-200">Over $200</option>
//       </select>
//     </div>

//     {/* Size Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Size</h3>
//       <select
//         value={selectedSize}
//         onChange={(e) => setSelectedSize(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="s">Small (S)</option>
//         <option value="m">Medium (M)</option>
//         <option value="l">Large (L)</option>
//         <option value="xl">Extra Large (XL)</option>
//       </select>
//     </div>

//     {/* Color Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Color</h3>
//       <select
//         value={selectedColor}
//         onChange={(e) => setSelectedColor(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="black">Black</option>
//         <option value="white">White</option>
//         <option value="red">Red</option>
//         <option value="blue">Blue</option>
//         <option value="pink">Pink</option>
//       </select>
//     </div>

//     {/* Brand Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Brand</h3>
//       <select
//         value={selectedBrand}
//         onChange={(e) => setSelectedBrand(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="zara">Zara</option>
//         <option value="hm">H&M</option>
//         <option value="local">Local Brand</option>
//       </select>
//     </div>

//     {/* Rating Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Rating</h3>
//       <select
//         value={selectedRating}
//         onChange={(e) => setSelectedRating(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="4">4★ & Above</option>
//         <option value="3">3★ & Above</option>
//       </select>
//     </div>

//     {/* Availability */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Availability</h3>
//       <select
//         value={selectedStock}
//         onChange={(e) => setSelectedStock(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="in-stock">In Stock</option>
//         <option value="out-stock">Out of Stock</option>
//       </select>
//     </div>

//     {/* Discount Filter */}
//     <div className="mb-6">
//       <h3 className="font-medium mb-3">Discount</h3>
//       <select
//         value={selectedDiscount}
//         onChange={(e) => setSelectedDiscount(e.target.value)}
//         className="w-full border rounded-lg px-3 py-2"
//       >
//         <option value="">All</option>
//         <option value="10">10% & Above</option>
//         <option value="20">20% & Above</option>
//         <option value="50">50% & Above</option>
//       </select>
//     </div>

//     <div className="mt-auto">
//       <button
//         onClick={() => {
//           setIsDrawerOpen(false);
//           setVisibleCount(8);
//         }}
//         className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
//       >
//         Apply Filter
//       </button>
//     </div>
//   </div>
// </div>


//     </div>

// export default Product2