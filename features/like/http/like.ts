import { axiosClient } from "@/http/axios/client/axios.client"
import { Like, Likes } from "../types/like.type"

export const getLikes = async () => {
    const response = await axiosClient.get<Likes>("/like/user")
    return response.data
}

export const getLike = async (releaseId: string) => {
    const response = await axiosClient.get<Like>(`/like/${releaseId}`)
    return response.data
}

export const createLike = async ({releaseId, type}: {releaseId: string, type: "ALBUM" | "TRACK"}) => {
    const response = await axiosClient.post<Like>(`/like`, { releaseId, type })
    return response.data
}

export const deleteLike = async (releaseId: string) => {
    const response = await axiosClient.delete<Like>(`/like/${releaseId}`)
    return response.data
}