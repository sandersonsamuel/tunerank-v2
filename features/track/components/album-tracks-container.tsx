"use client"

import { FeaturedAlbum } from "@/features/search/components/featured/album";
import { SearchTrackItem } from "@/features/search/components/list/track";
import { useAlbum } from "@/features/album/hooks/album.hooks";

type Props = {
  id: string
}

export const AlbumTracksContainer = ({ id }: Props) => {

  const { data: album } = useAlbum(id)

  if (!album) {
    return <div>Album not found</div>
  }

  return (
    <div className="px-3 mt-7">
      <FeaturedAlbum featuredResult={album} />
      <div className="flex flex-col gap-4 mt-3">
        <h2 className="sm:text-xl font-bold">Faixas</h2>

        <div className="flex flex-col gap-2">
          {album.tracks.map((track) => {
            const trackWithData = {
              ...track,
              images: album.images,
              release_date: album.release_date
            }
            return <SearchTrackItem key={track.id} track={trackWithData as any} minutes img={false} />
          })}
        </div>
      </div>
    </div>
  )
}