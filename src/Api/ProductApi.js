// src/api/productApi.js
import axiosInstance from "./axiosInstance";
import { v4 as uuidv4 } from 'uuid';
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your API URL

// Helper to get sessionId
const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
};

// Get cart
export const getCart = async () => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/cart?sessionId=${sessionId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  const data = await response.json();
  return data.data;
};

// Add to cart
export const addToCart = async (productId, quantity) => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      productId,
      quantity,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add to cart');
  }

  const data = await response.json();
  return data.data;
};

// Update quantity
export const updateCartItem = async (productId, quantity) => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/cart/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      productId,
      quantity,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update cart');
  }

  const data = await response.json();
  return data.data;
};

// Remove from cart
export const removeFromCart = async (productId) => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/cart/item/${productId}?sessionId=${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to remove from cart');
  }

  const data = await response.json();
  return data.data;
};

// Clear cart
export const clearCart = async () => {
  const sessionId = getSessionId();
  const response = await fetch(`${API_BASE_URL}/cart/clear?sessionId=${sessionId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to clear cart');
  }

  const data = await response.json();
  return data.data;
};

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
// export const getCart = async (userId) => {
//   try {
//     const response = await axiosInstance.get(`/cart?userId=${userId}`);
//     return response.data.data;
//   } catch (error) {
//     console.error('Error in getCart:', error);
//     throw error;
//   }
// };

// export const addToCart = async (userId, productId, quantity) => {
//   try {
//     const response = await axiosInstance.post('/cart/add', {
//       userId,
//       productId,
//       quantity,
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error in addToCart:', error);
//     throw error;
//   }
// };

// export const updateCartItem = async (userId, productId, quantity) => {
//   try {
//     const response = await axiosInstance.put('/cart/update', {
//       userId,
//       productId,
//       quantity,
//     });
//     return response.data.data;
//   } catch (error) {
//     console.error('Error in updateCartItem:', error);
//     throw error;
//   }
// };

// export const removeFromCart = async (userId, productId) => {
//   try {
//     const response = await axiosInstance.delete(
//       `/cart/item/${productId}?userId=${userId}`
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error('Error in removeFromCart:', error);
//     throw error;
//   }
// };

// export const clearCart = async (userId) => {
//   try {
//     const response = await axiosInstance.delete(
//       `/cart/clear?userId=${userId}`
//     );
//     return response.data.data;
//   } catch (error) {
//     console.error('Error in clearCart:', error);
//     throw error;
//   }
// };

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
  try {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data; // Return the full response data
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const allOrder = async (orderData) => {
  try {
    const response = await axiosInstance.get('/orders');
    return response.data; // Return the full response data
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// export const getUserOrders = async (email) => {
//   const response = await axiosInstance.get(`/orders/user?sessionId=${sessionid}`);
//   return response.data.data;
// };

// export const getAllOrders = async (email) => {
//   const url = email ? `/orders?sessionId=${sessionid}` : '/orders';
//   const response = await axiosInstance.get(url);
//   return response.data.data;
// };

// export const getOrderById = async (orderId) => {
//   const response = await axiosInstance.get(`/orders/${orderId}`);
//   return response.data.data;
// };

// export const updateOrderStatus = async (orderId, status) => {
//   const response = await axiosInstance.patch(
//     `/orders/${orderId}/status`,
//     { status }
//   );
//   return response.data.data;
// };

// export const cancelOrder = async (orderId, status) => {
//   const response = await axiosInstance.patch(
//     `/orders/${orderId}/status`,
//     { status }
//   );
//   return response.data.data;
// };

