import { Album } from "@/features/album/types/album.type"
import { Artist } from "@/features/artist/types/artist.type"
import { Track } from "@/features/track/types/track.type"
import { Dexie, Table } from "dexie"

export interface AlbumDB extends Album {
    order: number
}

export interface ArtistDB extends Artist {
    order: number
}

export interface TrackDB extends Track {
    order: number
}

export class AppDB extends Dexie {

  albuns: Table<AlbumDB, string>
  artists: Table<ArtistDB, string>
  tracks: Table<TrackDB, string>

  constructor() {
    super("AppDB")
    this.version(1).stores({
      albuns: "id, order",
      artists: "id, order",
      tracks: "id, order"
    })

    this.albuns = this.table("albuns")
    this.artists = this.table("artists")
    this.tracks = this.table("tracks")
  }
    
}

export const indexedDB = new AppDB()