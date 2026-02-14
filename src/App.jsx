import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Navbar from './components/Navbar';
import Home2 from './Home2';
import Products from './components/Products';
import Cart from './components/Card';
// Import other pages when you create them
// import Products from "./Pages/Products";
// import Cart from "./Pages/Cart";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes as you create the pages */}
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products?category=women" element={<Products />} />
          <Route path="/products?category=jewelry" element={<Products />} />
          <Route path="/products?category=sale" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;