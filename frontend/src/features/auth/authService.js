// for HTTP request

import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

// register user
export const serviceRegister = async (userData) => {
  const response = await axios.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

export const serviceLogout = async () => {
  localStorage.removeItem("user");
};

export const serviceLogin = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
