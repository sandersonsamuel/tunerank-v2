import { axiosClient } from "@/http/axios/client/axios.client"
import { Search } from "../types/search.type"

export const searchClient = async (query: string) => {
    const res = await axiosClient.get<Search>(`/search?q=${query}`)
    return res.data
}