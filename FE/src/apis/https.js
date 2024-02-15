import baseAxios from "axios";
import { useTokenStore } from "../app/store";
import { useEffect } from "react";

const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const accessToken = null;

  useEffect(async () => {
    const storedAccessToken = sessionStorage.getItem("accessTokenStorage");
    const parsedAccessToken = JSON.parse(storedAccessToken);
    accessToken = await parsedAccessToken.state.accessToken;
  }, []);

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export default axios;
