import { axiosServer } from "@/http/axios/server/axios.server"

export const searchServer = async (query: string) => {
    const res = await axiosServer.get(`/search?q=${query}`)
    return res.data
}