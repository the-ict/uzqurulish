import axios from "axios";

console.log("VITE URL: ", import.meta.env.VITE_BASE_URL);

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
      config.headers.AcceptLanguage = "uz";      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
