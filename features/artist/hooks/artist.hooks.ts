import { useQuery } from "@tanstack/react-query"
import { getArtist, getArtistAlbums, getArtistTopTracks } from "../http/artist"

export const useArtist = (id: string) => {
    return useQuery({
        queryKey: ["artist", id],
        queryFn: () => getArtist(id),
    })
}

export const useArtistTopTracks = (id: string) => {
    return useQuery({
        queryKey: ["artist-top-tracks", id],
        queryFn: () => getArtistTopTracks(id),
    })
}

export const useArtistAlbums = (id: string) => {
    return useQuery({
        queryKey: ["artist-albums", id],
        queryFn: () => getArtistAlbums(id),
    })
}
