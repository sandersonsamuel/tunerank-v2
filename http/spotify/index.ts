"use server"

let spotifyToken: {
  value: string
  expiresAt: number
} | null = null

export async function getSpotifyToken() {
  if (spotifyToken && Date.now() < spotifyToken.expiresAt) {
    return spotifyToken.value
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basic}`,
    },
    body: "grant_type=client_credentials"
  })

  const data = await res.json()

  spotifyToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in * 1000) - 60000
  }

  return data.access_token
}
