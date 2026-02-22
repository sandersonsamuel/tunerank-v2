import { Album } from "@/features/album/types/album.type"

export type Track = {
    id: string
    name: string
    images: {
        url: string
    }[]
    artists: {
        id: string
        name: string
    }[]
    releaseDate: string
    type: string
    album: Album
    duration_ms: number
}