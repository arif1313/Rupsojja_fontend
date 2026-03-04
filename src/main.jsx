import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { FavouriteProvider } from "./context/FavouriteContext";
import { CategoryProvider } from "./context/CategoryContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <CategoryProvider>
    <FavouriteProvider>
   
 <App />
    
   </FavouriteProvider>
   </CategoryProvider>
   </AuthProvider>
  </React.StrictMode>
);


