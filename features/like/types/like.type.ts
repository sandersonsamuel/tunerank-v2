import { Album } from "@/features/album/types/album.type"
import { Track } from "@/features/track/types/track.type"

export type Likes = {
    albums: Album[]
    tracks: Track[]
}

export type Like = {
    id: string
    releaseId: string
    userId: string,
    type: "ALBUM" | "TRACK"
}