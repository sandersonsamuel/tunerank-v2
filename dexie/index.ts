import { SpotifyAlbum } from "@/types/spotify/album"
import { SpotifyArtistItem } from "@/types/spotify/artist"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { Dexie, Table } from "dexie"

export interface AlbumDB extends SpotifyAlbum {
    order: number
}

export interface ArtistDB extends SpotifyArtistItem {
    order: number
}

export interface TrackDB extends SpotifyTrackItem {
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