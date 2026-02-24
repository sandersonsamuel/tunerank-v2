import { saveArtist } from "@/dexie/artists"
import { Artist } from "@/features/artist/types/artist.type"
import Link from "next/link"

type Props = {
  artist: Artist
}

export const SearchArtistItem = ({ artist }: Props) => {

  const handleClick = () => {
    saveArtist(artist)
  }

  const image = artist?.images[1] || artist?.images[0] || artist?.images[2]

  return (
    <Link href={`/artist/${artist.id}`} onClick={handleClick} className="flex flex-col items-center space-y-2 p-3 xl:p-4 hover:bg-card rounded-xl cursor-pointer transition-colors">
      <img className="size-20 xl:size-24 rounded-full object-cover" src={image?.url} alt={artist?.name + " profile image"} />
      <div className="text-center">
        <p className="line-clamp-2 text-sm">{artist?.name}</p>
        <p className="text-xs text-neutral-400">Artista</p>
      </div>
    </Link>
  )
}