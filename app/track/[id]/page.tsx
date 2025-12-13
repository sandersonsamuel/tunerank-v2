import { getTrack } from "@/http/spotify/tracks"
import { TrackLikeButton } from "@/components/features/likes/like-track"
import { TrackRatingCard } from "@/components/features/rating/rating-track-card"
import { TrackReviewsList } from "@/components/features/rating/track-reviews"
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
    <div className="flex flex-col items-center gap-4 px-3 mt-7">
      <img className="w-[180px] h-[180px] object-cover rounded-lg" src={track.album.images[0].url} alt={track.name + "album photo"} />
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold line-clamp-2 text-center">{track.name}</p>
        <p className="text-slate-400 line-clamp-1 text-center">{track.artists[0].name} - {track.album.release_date.slice(0, 4)}</p>
      </div>

      <div className="flex gap-2">
        <TrackLikeButton trackId={id} />
        <Button variant="outline" size={"icon-lg"}>
          <Share2 className="size-5" />
        </Button>
      </div>

      <TrackRatingCard key={id} trackId={id} />
      <TrackReviewsList trackId={id} />
    </div>
  )
}