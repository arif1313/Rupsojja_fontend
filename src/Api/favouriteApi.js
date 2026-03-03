import axiosInstance from './axiosConfig';

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
