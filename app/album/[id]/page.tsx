import { AlbumContainer } from "@/features/album/components/album-container"
import { getAlbumServer } from "@/features/album/http/album.server"
import { getLikeServer } from "@/features/like/http/like.server"
import { getReleaseRatesServer, getReleaseUserRateServer } from "@/features/rating/http/rating.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type Props = {
  params: Promise<{ id: string }>
}

export default async function AlbumPage({ params }: Props) {

  const { id } = await params

  const queryClient = new QueryClient()

  const promises = [
    queryClient.ensureQueryData({
      queryKey: ['album', id],
      queryFn: () => getAlbumServer(id),
    }),
    queryClient.ensureQueryData({
      queryKey: ['like', id],
      queryFn: () => getLikeServer(id),
    }),
    queryClient.ensureQueryData({
      queryKey: ['user-rate', id],
      queryFn: () => getReleaseUserRateServer(id),
    }),
    queryClient.ensureQueryData({
      queryKey: ['release-rates', id],
      queryFn: () => getReleaseRatesServer(id),
    })
  ]

  await Promise.all(promises)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AlbumContainer albumId={id} />
    </HydrationBoundary>
  )
}