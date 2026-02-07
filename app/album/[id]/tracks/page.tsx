import { FeaturedAlbum } from "@/components/features/search/featured/album";
import { SearchTrackItem } from "@/components/features/search/list/track";
import { getAlbum } from "@/http/spotify/albums";

type Props = {
  params: Promise<{ id: string }>
}

export default async function TracksPage({ params }: Props) {
  const { id } = await params
  const album = await getAlbum(id)

  if (Array.isArray(album) || "albums" in album) {
    return <div>Album not found</div>
  }

  return (
    <div className="px-3 mt-7">
      <FeaturedAlbum featuredResult={album} />
      <div className="flex flex-col gap-4 mt-3">
        <h2 className="sm:text-xl font-bold">Faixas</h2>

        <div className="flex flex-col gap-2">
          {album.tracks.items.map((track) => (
            <SearchTrackItem key={track.id} track={track} minutes />
          ))}
        </div>
      </div>
    </div>
  )
}