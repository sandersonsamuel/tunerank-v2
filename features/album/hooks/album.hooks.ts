import { useQuery } from "@tanstack/react-query"
import { getAlbum } from "../http/album"

export const useAlbum = (id: string) => {
    return useQuery({
        queryKey: ['album', id],
        queryFn: () => getAlbum(id),
        enabled: !!id,
    })
}