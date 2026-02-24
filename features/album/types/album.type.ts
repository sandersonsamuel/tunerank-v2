import { ArtistSummary, Image } from "../../../types/shared.type"

export type AlbumTrack = {
    id: string
    name: string
    artists: ArtistSummary[]
}

export type Album = {
    id: string
    name: string
    images: Image[]
    release_date: string
    type: string
    artists: ArtistSummary[]
    tracks: AlbumTrack[]
}