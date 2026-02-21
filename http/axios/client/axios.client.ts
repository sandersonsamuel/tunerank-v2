import axios from 'axios';
import toast from 'react-hot-toast';

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        if (error.response?.status == 401) {
            const response = await axiosClient.post("/auth/refresh")

            if (response.status == 200) {
                return axiosClient(error.config)
            }

            toast.error("Sua sessão expirou. Faça login novamente.");
            window.location.href = "/auth/login";
            return Promise.reject(error);
        }

        if (Array.isArray(error.response?.data)) {
            error.response.data.forEach((error: any) => {
                toast.error(error.message + " " + error.path.join(", "));
            })
        } else {
            toast.error(error.response?.data?.message || error.response?.data?.error || "Algo deu errado");
        }

        return Promise.reject(error);
    }
);