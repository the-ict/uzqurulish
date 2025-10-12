"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const axiosClient = axios_1.default.create({
    baseURL: process.env.DEEPSEEK_BASE_URL,
});
axiosClient.interceptors.request.use((config) => {
    const deepseekApiToken = process.env.DEEPSEEK_API_KEY;
    if (deepseekApiToken) {
        config.headers.Authorization = `Bearer ${deepseekApiToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
exports.default = axiosClient;
//# sourceMappingURL=axios.config.js.map