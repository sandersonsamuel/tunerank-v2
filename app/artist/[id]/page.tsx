import { ArtistContainer } from "@/features/artist/components/artist-container"
import { getArtistAlbumsServer, getArtistServer, getArtistTopTracksServer } from "@/features/artist/http/artist.server"
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ArtistPage({ params }: Props) {

  const { id } = await params

  if (!id) {
    return null
  }

  const queryClient = new QueryClient()

  await queryClient.ensureQueryData({
    queryKey: ["artist", id],
    queryFn: () => getArtistServer(id),
  })

  await queryClient.ensureQueryData({
    queryKey: ["artist-top-tracks", id],
    queryFn: () => getArtistTopTracksServer(id),
  })

  await queryClient.ensureQueryData({
    queryKey: ["artist-albums", id],
    queryFn: () => getArtistAlbumsServer(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArtistContainer artistId={id} />
    </HydrationBoundary>
  )
  
}