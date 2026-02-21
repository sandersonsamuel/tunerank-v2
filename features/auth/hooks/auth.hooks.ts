import { useQuery } from "@tanstack/react-query"
import { getAuth } from "../http/auth"

export const useAuth = () => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: getAuth,
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })
}