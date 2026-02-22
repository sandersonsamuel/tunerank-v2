import { ArtistSummary, Image } from "../../../types/shared.type"

export type Album = {
    id: string
    name: string
    images: Image[]
    release_date: string
    type: string
    artists: ArtistSummary[]
}