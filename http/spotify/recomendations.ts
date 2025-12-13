import { getSpotifyToken } from "."

export const getSpotifyRecommendations = async () => {

  const token = await getSpotifyToken()

  const response = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL}browse/categories?locale=pt_BR`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const data = await response.json()
  console.log(data)

}