import { Album } from "@/features/album/types/album.type"
import { Track } from "@/features/track/types/track.type"

export type Review = {
    id: string
    userId: string
    releaseId: string
    rating: number
    review: string
    createdAt: string
    updatedAt: string
}

export type ReviewAlbum = Review & {
    album: Album
}   

export type ReviewTrack = Review & {
    track: Track
}

export type UserResponseReviews = {
    albums: ReviewAlbum[]
    tracks: ReviewTrack[]
}