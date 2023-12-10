import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const axiosAuth = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user && !config.headers["Authorization"])
      config.headers.Authorization = `Bearer ${session?.user.token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAuth;
