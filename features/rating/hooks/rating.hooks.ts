import { useQuery } from "@tanstack/react-query"
import { getUserRate, getUserRates, getReleaseRates } from "../http/rating"

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

export const useReleaseRates = (releaseId: string) => {
    return useQuery({
        queryKey: ['release-rates', releaseId],
        queryFn: () => getReleaseRates(releaseId),
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