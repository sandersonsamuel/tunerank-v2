import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosServer.interceptors.request.use(async (config) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    if (accessToken) {
        config.headers.Cookie = `accessToken=${accessToken}`
    }
    return config
})

axiosServer.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
);