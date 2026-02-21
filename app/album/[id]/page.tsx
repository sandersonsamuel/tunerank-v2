import { AlbumContainer } from "@/features/album/components/album-container"
import { getAlbumServer } from "@/features/album/http/album.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type Props = {
  params: Promise<{ id: string }>
}

export default async function AlbumPage({ params }: Props) {

  const { id } = await params

  const queryClient = new QueryClient()
  await queryClient.ensureQueryData({
    queryKey: ['album', id],
    queryFn: () => getAlbumServer(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumContainer albumId={id} />
    </HydrationBoundary>
  )
}