import axiosInstance from './axiosConfig';

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
