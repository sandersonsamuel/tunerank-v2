import { axiosClient } from "@/http/axios/client/axios.client"
import { Artist } from "../types/artist.type"
import { Track } from "@/features/track/types/track.type"
import { Album } from "@/features/album/types/album.type"

export const getArtist = async (id: string) => {
    const res = await axiosClient.get<Artist>(`/artist/${id}`)
    return res.data
}

export const getArtistTopTracks = async (id: string) => {
    const res = await axiosClient.get<Track[]>(`/artist/${id}/top-tracks`)
    return res.data
}

export const getArtistAlbums = async (id: string) => {
    const res = await axiosClient.get<Album[]>(`/artist/${id}/albums`)
    return res.data
}