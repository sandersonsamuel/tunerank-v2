import { getAlbumServer } from "@/features/album/http/album.server"
import { AlbumTracksContainer } from "@/features/track/components/album-tracks-container"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type Props = {
  params: Promise<{ id: string }>
}

export default async function TracksPage({ params }: Props) {
  const { id } = await params
  const queryClient = new QueryClient()

  await queryClient.ensureQueryData({
    queryKey: ['album', id],
    queryFn: () => getAlbumServer(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumTracksContainer id={id} />
    </HydrationBoundary>
  )
}