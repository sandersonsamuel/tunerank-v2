import { useQuery } from "@tanstack/react-query"
import { getRatingTrack, getTrackRates } from "./track-services"
import { getAlbumRates, getRatingAlbum } from "./album-services"

export const useGetRatingTrack = (trackId?: string, userId?: string) => {
  return useQuery({
    queryKey: ["rating-track", trackId, userId],
    queryFn: () => getRatingTrack(trackId && userId ? trackId + "_" + userId : undefined),
    enabled: !!(trackId && userId)
  })
}

export const useGetRatingAlbum = (albumId?: string, userId?: string) => {
  return useQuery({
    queryKey: ["rating-album", albumId, userId],
    queryFn: () => getRatingAlbum(albumId && userId ? albumId + "_" + userId : undefined),
    enabled: !!(albumId && userId)
  })
}

export const useTrackRates = (trackId: string) => {
  return useQuery({
    queryKey: ["track-rates", trackId],
    queryFn: () => getTrackRates(trackId),
    enabled: !!trackId
  })
}

export const useAlbumRates = (albumId: string) => {
  return useQuery({
    queryKey: ["album-rates", albumId],
    queryFn: () => getAlbumRates(albumId),
    enabled: !!albumId
  })
}
