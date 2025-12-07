import { getAlbum } from "@/http/spotify/albums"
import { AlbumLikeButton } from "@/components/features/likes/like-album"
import { Button } from "@/components/ui/button"
import { ListMusic, Share2 } from "lucide-react"
import { AlbumRatingCard } from "@/components/features/rating/rating-album-card"
import { AlbumReviewsList } from "@/components/features/rating/album-reviews"
import Link from "next/link"

type Props = {
  params: Promise<{ id: string }>
}

export default async function AlbumPage({ params }: Props) {

  const { id } = await params
  const album = await getAlbum(id)

  if (!album) {
    return <div>Album not found</div>
  }

  return (
    <div className="flex flex-col items-center gap-4 px-3">
      <img className="w-[180px] h-[180px] object-cover rounded-lg" src={album.images[0].url} alt={album.name + "album photo"} />
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold line-clamp-2 text-center">{album.name}</p>
        <p className="text-slate-400 line-clamp-1 text-center">{album.artists[0].name} - {album.release_date.slice(0, 4)}</p>
        <p className="text-slate-400">{album.total_tracks} faixas</p>
      </div>

      <div className="flex gap-2">
        <AlbumLikeButton albumId={album.id} />
        <Link href={`/album/${album.id}/tracks`}>
          <Button variant="outline" size={"icon-lg"}>
            <ListMusic className="size-5" />
          </Button>
        </Link>
        <Button variant="outline" size={"icon-lg"}>
          <Share2 className="size-5" />
        </Button>
      </div>

      <AlbumRatingCard albumId={album.id} />
      <AlbumReviewsList albumId={album.id} />
    </div>
  )
}