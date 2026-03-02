import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
// import ProductsManagement from "../pages/admin/ProductsManagement";
import AddProduct from "../components/AddProduct";
import OrdersManagement from "../components/OrdersManagement";
import Home from "../Pages/Home";
import Products from "../components/Products";
import AdminLayout from "../components/AdminLayout"; // Added missing import

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      {/* <Route path="/orders" element={<Orders />} /> */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        {/* <Route path="products" element={<ProductsManagement />} /> */}
        <Route path="add-product" element={<AddProduct />} />
        <Route path="orders" element={<OrdersManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;