import { axiosServer } from "@/http/axios/server/axios.server"
import { Track } from "../types/track.type"

export const getTrackServer = async (id: string) => {
    const response = await axiosServer.get<Track>(`/track/${id}`)
    return response.data
}