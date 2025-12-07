import { getTrack } from "@/api/spotify/get-track"
import { LikeTrack } from "@/components/like-track"
import { RatingTrackCard } from "@/components/rating/rating-track-card"
import { TrackRates } from "@/components/rating/track-rates"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

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
    <div className="flex flex-col items-center gap-4 px-3">
      <img className="w-[180px] rounded-lg" src={track.album.images[0].url} alt={track.name + "album photo"} />
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">{track.name}</p>
        <p className="text-slate-400">{track.artists[0].name} - {track.album.release_date.slice(0, 4)}</p>
      </div>

      <div className="flex gap-2">
        <LikeTrack trackId={id} />
        <Button variant="outline" size={"icon-lg"}>
          <Share2 className="size-5" />
        </Button>
      </div>

      <RatingTrackCard key={id} trackId={id} />
      <TrackRates trackId={id} />
    </div>
  )
}