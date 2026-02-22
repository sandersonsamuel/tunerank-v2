import { useQuery } from "@tanstack/react-query"
import { searchClient } from "../http/search"

export const useSearch = (query: string) => {
    return useQuery({
        queryKey: ["search", query],
        queryFn: () => searchClient(query),
        enabled: !!query
    })
}