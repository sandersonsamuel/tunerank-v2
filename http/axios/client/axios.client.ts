import axios from 'axios';
import toast from 'react-hot-toast';

export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

let isRefreshing = false;

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {

        if (error.response?.status == 401 && !error.config.url?.includes("/auth/refresh") && !isRefreshing) {
            isRefreshing = true;

            try {
                const response = await axiosClient.post("/auth/refresh")

                if (response.status == 200) {
                    return axiosClient(error.config)
                }
            } finally {
                isRefreshing = false;
            }
        }

        if (Array.isArray(error.response?.data)) {
            error.response.data.forEach((error: any) => {
                toast.error(error.message + " " + error.path.join(", "));
            })
        } else {
            if (error.response.status !== 401) {
                toast.error(error.response?.data?.message || error.response?.data?.error || "Algo deu errado");
            }
        }

        return Promise.reject(error);
    }
);