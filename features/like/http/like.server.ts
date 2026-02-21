import { axiosServer } from "@/http/axios/server/axios.server"
import { Likes } from "../types/like.type"

export const getLikesServer = async () => {
    const response = await axiosServer.get<Likes[]>("/like/user")
    return response.data
}

export const getLikeServer = async (releaseId: string) => {
    const response = await axiosServer.get<Likes>(`/like/${releaseId}`)
    return response.data
}