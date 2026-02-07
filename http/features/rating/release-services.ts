import { db } from "@/firebase/config"
import { getAlbum } from "@/http/spotify/albums"
import { getTrack } from "@/http/spotify/tracks"
import { RateRelease } from "@/types/rate"
import { SpotifyAlbum } from "@/types/spotify/album"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { collection, getDocs, query, where } from "firebase/firestore"

export const getReleasesByUserId = async (userId: string) => {
  try {

    const q = query(
      collection(db, "ratings"),
      where("userId", "==", userId)
    )

    const querySnapshot = await getDocs(q)
    const rates: RateRelease[] = []

    querySnapshot.forEach((doc) => {
      rates.push(doc.data() as RateRelease)
    })

    const albumsPromise = getAlbum(rates.filter((rate) => rate.type === "album").map((rate) => rate.releaseId))
    const tracksPromise = getTrack(rates.filter((rate) => rate.type === "track").map((rate) => rate.releaseId))

    let [albumsData, tracksData] = await Promise.all([albumsPromise, tracksPromise])

    const albums: SpotifyAlbum[] = []
    const tracks: SpotifyTrackItem[] = []

    if ("tracks" in tracksData) {
      tracks.push(...tracksData.tracks)
    }else{
      tracks.push(tracksData)
    }

    if ("albums" in albumsData) {
      albums.push(...albumsData.albums)
    }else {
      albums.push(albumsData)
    }
    
    return {
      albums: rates.filter((rate) => rate.type === "album").map((rate) => {
        return {
          ...rate,
          release: albums.find((album) => album.id === rate.releaseId)
        }
      }),
      tracks: rates.filter((rate) => rate.type === "track").map((rate) => {
        return {
          ...rate,
          release: tracks.find((track) => track.id === rate.releaseId)
        }
      })
    }

  } catch (error) {
    console.error("Error getting release rates:", error)
    return {
      albums: [],
      tracks: []
    }
  }
}