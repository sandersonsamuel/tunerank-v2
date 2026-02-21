import { axiosClient } from "@/http/axios/client/axios.client"
import { Album } from "../types/album.type"

export const getAlbum = async (id: string) => {
    const response = await axiosClient.get<Album>(`/album/${id}`)
    return response.data
}