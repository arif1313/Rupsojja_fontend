import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from './Router/AppRoutes'
import { SearchProvider } from "./context/SearchContext";
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";

function App() {
  return (
    <SearchProvider>
      <CartProvider>
      <Router>
     <Navbar></Navbar>
     <CartDrawer />
        <AppRoutes></AppRoutes>
         <Toaster position="top-right" />
      </Router>
      </CartProvider>
    </SearchProvider>

  );
}

export default App;
