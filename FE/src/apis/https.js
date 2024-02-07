import baseAxios from "axios";
import { useTokenStore } from "../app/store";

const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axios;
