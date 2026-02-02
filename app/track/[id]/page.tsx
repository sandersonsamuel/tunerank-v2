
import { TrackPageContainer } from "@/components/layout/pages/track-page"
import { getTrack } from "@/http/spotify/tracks"

type Props = {
  params: Promise<{ id: string }>
}

export default async function TrackPage({ params }: Props) {

  const { id } = await params
  const track = await getTrack(id)

  if (!track) {
    return <div>Track not found</div>
  }


  return (
    <TrackPageContainer track={track} id={id} />
  )

  
}