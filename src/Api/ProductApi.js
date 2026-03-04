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

// ________________________
export const getCart = async (userId) => {
  try {
    const response = await axiosInstance.get(`/cart?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error in getCart:', error);
    throw error;
  }
};

export const addToCart = async (userId, productId, quantity) => {
  try {
    const response = await axiosInstance.post('/cart/add', {
      userId,
      productId,
      quantity,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error in addToCart:', error);
    throw error;
  }
};

export const updateCartItem = async (userId, productId, quantity) => {
  try {
    const response = await axiosInstance.put('/cart/update', {
      userId,
      productId,
      quantity,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error in updateCartItem:', error);
    throw error;
  }
};

export const removeFromCart = async (userId, productId) => {
  try {
    const response = await axiosInstance.delete(
      `/cart/item/${productId}?userId=${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in removeFromCart:', error);
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    const response = await axiosInstance.delete(
      `/cart/clear?userId=${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error in clearCart:', error);
    throw error;
  }
};

// -----------------

export const getFavourites = async (userId) => {
  const response = await axiosInstance.get(`/favourites?userId=${userId}`);
  return response.data.data;
};

export const addToFavourites = async (userId, productId) => {
  const response = await axiosInstance.post('/favourites/add', {
    userId,
    productId,
  });
  return response.data.data;
};

export const removeFromFavourites = async (userId, productId) => {
  const response = await axiosInstance.delete(
    `/favourites/${productId}?userId=${userId}`
  );
  return response.data.data;
};
// ____________________

export const createOrder = async (orderData) => {
  const response = await axiosInstance.post('/orders', orderData);
  return response.data;
};

export const getUserOrders = async (email) => {
  const response = await axiosInstance.get(`/orders/user?email=${email}`);
  return response.data.data;
};

export const getAllOrders = async (email) => {
  const url = email ? `/orders?email=${email}` : '/orders';
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const getOrderById = async (orderId) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axiosInstance.patch(
    `/orders/${orderId}/status`,
    { status }
  );
  return response.data.data;
};

export const cancelOrder = async (orderId, status) => {
  const response = await axiosInstance.patch(
    `/orders/${orderId}/status`,
    { status }
  );
  return response.data.data;
};
