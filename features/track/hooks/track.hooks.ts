import { useQuery } from "@tanstack/react-query"
import { getTrack } from "../http/track"

export const useTrack = (id: string) => {
    return useQuery({
        queryKey: ['track', id],
        queryFn: () => getTrack(id),
        enabled: !!id,
    })
}
