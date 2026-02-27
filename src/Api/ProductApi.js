// src/api/productApi.js
import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data.data; // only products array
};


// 🔹 Create new product
export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);
  return response.data;
};

// // 🔹 Get single product by ID
// export const getProductById = async (id) => {
//   const response = await axiosInstance.get(`/products/${id}`);
//   return response.data;
// };


// // 🔹 Update product
// export const updateProduct = async (id, updatedData) => {
//   const response = await axiosInstance.put(`/products/${id}`, updatedData);
//   return response.data;
// };

// 🔹 Delete product
// export const deleteProduct = async (id) => {
//   const response = await axiosInstance.delete(`/products/${id}`);
//   return response.data;
// };
