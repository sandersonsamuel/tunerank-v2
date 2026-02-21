import { axiosClient } from "@/http/axios/client/axios.client"
import { Track } from "../types/track.type"

export const getTrack = async (id: string) => {
    const response = await axiosClient.get<Track>(`/track/${id}`)
    return response.data
}