import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.DEEPSEEK_BASE_URL,
})

axiosClient.interceptors.request.use(
    (config) => {
        const deepseekApiToken = process.env.DEEPSEEK_API_KEY
        if(deepseekApiToken) {
            config.headers.Authorization = `Bearer ${deepseekApiToken}`
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
