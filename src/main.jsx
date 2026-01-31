import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




// import React from "react";
// import ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import "./index.css";
// import App from "./App.jsx";
// import Home from "./Pages/Home.jsx";

// Pages



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />, 
    
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
// children: [
    //   { index: true, element: <Home /> },

    //   { path: "shop", element: <Shop /> },
    //   { path: "product/:id", element: <ProductDetails /> },

    //   { path: "cart", element: <Cart /> },
    //   { path: "checkout", element: <Checkout /> },

    //   { path: "login", element: <Login /> },
    //   { path: "register", element: <Register /> },

    //   // Admin routes
    //   {
    //     path: "admin",
    //     element: <AdminDashboard />,
    //     children: [
    //       { path: "add-product", element: <AddProduct /> },
    //       { path: "products", element: <ProductList /> },
    //       { path: "orders", element: <OrderList /> },
    //     ],
    //   },
    // ],