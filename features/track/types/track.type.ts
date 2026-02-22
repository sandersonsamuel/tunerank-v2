import { ArtistSummary, Image } from "@/types/shared.type"

export type Track = {
    id: string
    name: string
    images: Image[]
    release_date: string
    type: string
    artists: ArtistSummary[]
}