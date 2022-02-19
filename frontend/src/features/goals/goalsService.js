import axios from "axios";

const API_URL = "http://localhost:5000/api/goals/";

export const serviceAddText = async (text, token) => {
  // send token from frontend to backend
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, { text }, config);
  return response.data;
};

export const serviceGetGoals = async (token) => {
  // send token from frontend to backend
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const sercviceDeleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
