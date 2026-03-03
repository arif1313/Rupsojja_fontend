

import axiosInstance from "./axiosInstance";


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