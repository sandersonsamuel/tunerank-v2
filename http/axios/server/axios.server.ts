import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosServer = axios.create({
    baseURL: process.env.INTERNAL_API_URL,
});

axiosServer.interceptors.request.use(async (config) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (accessToken) {
        config.headers.Cookie = `accessToken=${accessToken}`
        console.log(`[Axios Server Request] ${config.method?.toUpperCase()} ${config.url} - Token: ${accessToken.substring(0, 10)}...`);
    } else {
        console.warn(`[Axios Server Request] ${config.method?.toUpperCase()} ${config.url} - NO ACCESS TOKEN`);
    }
    return config
})

axiosServer.interceptors.response.use(
    (response) => {
        console.log(`[Axios Server Response] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
        return response
    },
    (error) => {

        if (error.response?.status === 401) {
            return {
                data: null
            }
        }

        console.error(`[Axios Server Error] ${error.config?.method?.toUpperCase()} ${error.config?.url} - Status: ${error.response?.status}`);
        if (error.response?.data) {
            console.error(`[Axios Server Error Data]:`, error.response.data);
        }

        return Promise.reject(error)
    }
);