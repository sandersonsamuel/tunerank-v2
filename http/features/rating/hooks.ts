import { useQuery } from "@tanstack/react-query"
import { getRating, getTrackRates } from "./services"

export const useGetRating = (trackId?: string, userId?: string) => {
  return useQuery({
    queryKey: ["rating", trackId, userId],
    queryFn: () => getRating(trackId && userId ? trackId + "_" + userId : undefined),
    enabled: !!(trackId && userId) // Só executa se tiver ambos
  })
}

export const useTrackRates = (trackId: string) => {
  return useQuery({
    queryKey: ["track-rates", trackId],
    queryFn: () => getTrackRates(trackId),
    enabled: !!trackId
  })
}
