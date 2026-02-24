import { Album } from "@/features/album/types/album.type"
import { Track } from "@/features/track/types/track.type"

export type Rate = {
    id: string
    userId: string
    releaseId: string
    rating: number
    review: string
    createdAt: string
    updatedAt: string
}

export type RateAlbum = Rate & {
    album: Album
}

export type RateTrack = Rate & {
    track: Track
}

export type UserRatesResponse = {
    albums: RateAlbum[]
    tracks: RateTrack[]
}

export type ReleaseRatesResponse = {
    distribution: {
        rating: number
        count: number
    }[]
    average: number
    total: number
}