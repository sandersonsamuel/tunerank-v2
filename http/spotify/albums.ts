import { SpotifyAlbum } from "@/types/spotify/album"
import { getSpotifyToken } from "."

export const getAlbum = async (id: string | string[]): Promise<SpotifyAlbum | {albums: SpotifyAlbum[]}> => {
  const token = await getSpotifyToken()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}albums${Array.isArray(id) && id.length > 1 ? "?ids=" + id.join(",") + "&locale=pt-BR" : "/" + id + "?locale=pt-BR"}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  return data
}
