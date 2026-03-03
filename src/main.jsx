import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { FavouriteProvider } from "./context/FavouriteContext";
import { CategoryProvider } from "./context/CategoryContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <CategoryProvider>
    <FavouriteProvider>
    <CartProvider>
 <App />
    </CartProvider>
   </FavouriteProvider>
   </CategoryProvider>
   </AuthProvider>
  </React.StrictMode>
);


