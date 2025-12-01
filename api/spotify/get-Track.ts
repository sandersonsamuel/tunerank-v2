import { SpotifyTrackItem } from "@/types/spotify/track"
import { getSpotifyToken } from "."

export const getTrack = async (id: string) : Promise<SpotifyTrackItem> => {
  const token = await getSpotifyToken()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}/tracks/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  return data
}