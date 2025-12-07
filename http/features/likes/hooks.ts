import { useQuery } from "@tanstack/react-query"
import { getLikeAlbum, getLikeTrack } from "./services"

type TrackProps = {
  userId?: string
  trackId: string
}

export const useGetLikeTrack = ({ userId, trackId }: TrackProps) => {
  return useQuery({
    queryKey: ["like-track", userId, trackId],
    queryFn: () => getLikeTrack(userId!, trackId),
    enabled: !!userId
  })
}

type AlbumProps = {
  userId?: string
  albumId: string
}

export const useGetLikeAlbum = ({ userId, albumId }: AlbumProps) => {
  return useQuery({
    queryKey: ["like-album", userId, albumId],
    queryFn: () => getLikeAlbum(userId!, albumId),
    enabled: !!userId
  })
}
