import { SpotifySearchResult } from "@/types/spotify/aat"
import { getSpotifyToken } from "./auth"
import stringSimilarity from "string-similarity";
import { SpotifyAlbum, SpotifyArtist } from "@/types/spotify/album";
import { SpotifyTrackItem } from "@/types/spotify/track";

type Props = {
  query: string
}

interface SearchResponse extends SpotifySearchResult {
  betterResult?: SpotifyAlbum | SpotifyTrackItem | SpotifyArtist,
}

export const searchSpotify = async ({ query }: Props): Promise<SearchResponse> => {

  if (!query) return {}

  const token = await getSpotifyToken()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}search?q=${query}&type=artist,album,track&limit=4&locale=pt-BR`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json() as SpotifySearchResult

  const betterAlbum = data?.albums?.items[0]
  const betterTrack = data?.tracks?.items[0]
  const betterArtist = data?.artists?.items[0]

  const weights: Record<"album" | "track" | "artist", number> = {
    album: 1.1,
    track: 1.4,
    artist: 0.6
  };

  const similarity = {
    album: stringSimilarity.compareTwoStrings(betterAlbum?.name || "", query) * weights.album,
    track: stringSimilarity.compareTwoStrings(betterTrack?.name || "", query) * weights.track,
    artist: stringSimilarity.compareTwoStrings(betterArtist?.name || "", query) * weights.artist
  }

  const bestMatch = Object.entries(similarity).reduce((a, b) => {
    return a[1] > b[1] ? a : b
  })

  switch (bestMatch[0]) {
    case 'album':
      return {
        ...data,
        betterResult: betterAlbum
      }
    case 'track':
      return {
        ...data,
        betterResult: betterTrack
      }
    case 'artist':
      return {
        ...data,
        betterResult: betterArtist
      }
    default:
      return data
  }
}
