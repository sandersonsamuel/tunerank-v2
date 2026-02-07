import { useQuery } from "@tanstack/react-query"
import { getLikeAlbum, getLikeTrack, getLikedTracks, getLikedAlbums } from "./services"
import { Like } from "@/types/track"
import { getAlbum } from "@/http/spotify/albums"
import { getTrack } from "@/http/spotify/tracks"

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

export const useGetLikedTracks = ({ userId }: { userId?: string }) => {
  return useQuery({
    queryKey: ["like-tracks", userId],
    queryFn: () => getLikedTracks(userId!),
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

export const useGetLikedAlbums = ({ userId }: { userId?: string }) => {
  return useQuery({
    queryKey: ["like-albums", userId],
    queryFn: () => getLikedAlbums(userId!),
    enabled: !!userId
  })
}

export const useGetLikedAlbumsById = (albumsId: string[]) => {
  return useQuery({
    queryKey: ["like-albums", albumsId],
    queryFn: () => getAlbum(albumsId),
    enabled: !!albumsId
  })
}

export const useGetLikedTracksById = (tracksId: string[]) => {
  return useQuery({
    queryKey: ["like-tracks", tracksId],
    queryFn: () => getTrack(tracksId),
    enabled: !!tracksId
  })
}


