import { useQuery } from "@tanstack/react-query"
import { getReviews } from "../http/review"

export const useUserReviews = () => {
    return useQuery({
        queryKey: ['user-reviews'],
        queryFn: getReviews,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: 1,
    })
}