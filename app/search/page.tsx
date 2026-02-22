import { SearchContainer } from "@/features/search/components/search-container"
import { searchServer } from "@/features/search/http/search.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function Search(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const searchParams = await props.searchParams
  const query = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q

  const queryClient = new QueryClient()

  if (query){
    await queryClient.prefetchQuery({
      queryKey: ["search", query],
      queryFn: () => searchServer(query)
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchContainer query={query}/>
    </HydrationBoundary>
  )
}
