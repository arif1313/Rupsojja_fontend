import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { FavouriteProvider } from "./context/FavouriteContext";
import { CategoryProvider } from "./context/CategoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CategoryProvider>
    <FavouriteProvider>
    <CartProvider>
 <App />
    </CartProvider>
   </FavouriteProvider>
   </CategoryProvider>
  </React.StrictMode>
);


