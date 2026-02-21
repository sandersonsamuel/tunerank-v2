import { axiosServer } from "@/http/axios/server/axios.server"

export const getAlbumServer = async (id: string) => {
    const response = await axiosServer.get(`/album/${id}`)
    return response.data
}