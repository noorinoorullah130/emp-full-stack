import axios from "axios";
import { getTokenAndRole } from "./auth";

const api = axios.create({
    baseURL: "https://emp-backend-mdoo.onrender.com/api",
});

api.interceptors.request.use(
    (config) => {
        const { token } = getTokenAndRole();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
