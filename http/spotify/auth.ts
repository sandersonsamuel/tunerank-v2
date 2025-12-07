"use server"

let spotifyToken: null | string = null

export async function getSpotifyToken() {
  if (spotifyToken) return spotifyToken

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
  spotifyToken = data.access_token

  return data.access_token
}
