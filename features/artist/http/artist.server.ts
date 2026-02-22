import { axiosServer } from "@/http/axios/server/axios.server"

export const getArtistServer = async (id: string) => {
    const res = await axiosServer.get(`/artist/${id}`)
    return res.data
}

export const getArtistTopTracksServer = async (id: string) => {
    const res = await axiosServer.get(`/artist/${id}/top-tracks`)
    return res.data
}

export const getArtistAlbumsServer = async (id: string) => {
    const res = await axiosServer.get(`/artist/${id}/albums`)
    return res.data
}