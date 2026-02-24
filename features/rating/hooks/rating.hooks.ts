import { useQuery } from "@tanstack/react-query"
import { getReleaseRates, getUserRate, getUserRates } from "../http/rating"
import { getAlbumRates } from "@/http/features/rating/album-services"

export const useUserRates = () => {
    return useQuery({
        queryKey: ['user-rates'],
        queryFn: getUserRates,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 1,
    })
}

export const useReleaseRates = (albumId: string) => {
    return useQuery({
        queryKey: ['release-rates', albumId],
        queryFn: () => getReleaseRates(albumId),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 1,
    })
}

export const useReleaseUserRate = (releaseId: string) => {
    return useQuery({
        queryKey: ['user-rate', releaseId],
        queryFn: () => getUserRate(releaseId),
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 1,
    })
}