import { SearchContainer } from "@/components/features/search/search-container"
import { searchSpotify } from "@/http/spotify/search"

export default async function Search(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const searchParams = await props.searchParams
  const query = searchParams.query as string

  const {
    betterResult,
    albums,
    artists,
    tracks
  } = await searchSpotify({ query })

  return (
    <SearchContainer
      betterResult={betterResult}
      albums={albums}
      artists={artists}
      tracks={tracks}
    />
  )
}
