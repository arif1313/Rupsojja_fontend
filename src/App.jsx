import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Navbar from './components/Navbar';
import Home2 from './Home2';
import Products from './components/Products';
import Cart from './components/Card';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import ProductsManagement from './components/ProductsManagement';
import AddProduct from './components/AddProduct';
import OrdersManagement from './components/OrdersManagement';
// Import other pages when you create them
// import Products from "./Pages/Products";
// import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products?category=women" element={<Products />} />
          <Route path="/products?category=jewelry" element={<Products />} />
          <Route path="/products?category=sale" element={<Products />} />


           <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<OrdersManagement />} />
        </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;