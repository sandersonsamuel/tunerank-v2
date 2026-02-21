import { useQuery } from "@tanstack/react-query"
import { getLike, getLikes } from "../http/like"

export const useLikes = () => {
    return useQuery({
        queryKey: ["likes"],
        queryFn: () => getLikes()
    })
}

export const useLike = (releaseId: string) => {
    return useQuery({
        queryKey: ["like", releaseId],
        queryFn: () => getLike(releaseId)
    })
}