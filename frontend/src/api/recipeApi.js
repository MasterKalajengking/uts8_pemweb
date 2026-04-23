import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getRecipes = async (params) => {
  const response = await axios.get(`${BASE_URL}/resepUMKM`, { params });
  return response.data;
};

export const createRecipe = async (payload) => {
  const response = await axios.post(`${BASE_URL}/resepUMKM`, payload);
  return response.data;
};