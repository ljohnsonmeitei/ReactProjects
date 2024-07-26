import axios from 'axios';

const API_URL = 'http://localhost:5000/restaurants';

export const getRestaurants = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addRestaurant = async (restaurant) => {
  const response = await axios.post(API_URL, restaurant);
  return response.data;
};

export const updateRestaurant = async (id, restaurant) => {
  const response = await axios.put(`${API_URL}/${id}`, restaurant);
  return response.data;
};

export const deleteRestaurant = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};