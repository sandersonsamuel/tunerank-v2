import { Image } from "@/types/shared.type"

export type Artist = {
    id: string
    name: string
    images: Image[]
    type: string
}