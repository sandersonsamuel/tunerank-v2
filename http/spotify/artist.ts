import { SpotifyArtistItem } from "@/types/spotify/artist"
import { getSpotifyToken } from "."
import { SpotifyTrackItem } from "@/types/spotify/track"
import { SpotifyAlbum } from "@/types/spotify/album"

export const getArtist = async (id: string) => {

  const spotifyToken = await getSpotifyToken()

  const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
      'Content-Type': 'application/json'
    }
  })

  return await response.json() as SpotifyArtistItem
}

export const getArtistTopTracks = async (id: string) => {

  const spotifyToken = await getSpotifyToken()

  const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=BR`, {
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
      'Content-Type': 'application/json'
    }
  })

  return await response.json() as {
    tracks: SpotifyTrackItem[]
  }

}

export const getArtistAlbums = async (id: string) => {

  const spotifyToken = await getSpotifyToken()

  const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
    headers: {
      Authorization: `Bearer ${spotifyToken}`,
      'Content-Type': 'application/json'
    }
  })

  return await response.json() as {
    items: SpotifyAlbum[]
  }

}