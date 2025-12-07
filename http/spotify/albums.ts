import { SpotifyAlbum } from "@/types/spotify/album"
import { getSpotifyToken } from "./auth"

export const getAlbum = async (id: string): Promise<SpotifyAlbum> => {
  const token = await getSpotifyToken()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}albums/${id}?locale=pt-BR`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  return data
}
