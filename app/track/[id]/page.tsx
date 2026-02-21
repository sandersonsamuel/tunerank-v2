
import { TrackContainer } from "@/features/track/components/track-container"
import { getTrackServer } from "@/features/track/http/track.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

type Props = {
  params: Promise<{ id: string }>
}

export default async function TrackPage({ params }: Props) {

  const { id } = await params

  const queryClient = new QueryClient()

  await queryClient.ensureQueryData({
    queryKey: ['track', id],
    queryFn: () => getTrackServer(id),
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrackContainer id={id} />
    </HydrationBoundary>
  )
}