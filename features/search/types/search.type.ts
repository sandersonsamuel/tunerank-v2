import { Album } from "@/features/album/types/album.type"
import { Artist } from "@/features/artist/types/artist.type"
import { Track } from "@/features/track/types/track.type"

export type Search = {
    albums?: Album[]
    artists?: Artist[]
    tracks?: Track[]
}