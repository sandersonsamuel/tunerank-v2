import { SpotifyArtistItem } from "@/types/spotify/artist"
import Link from "next/link"

type Props = {
  artist: SpotifyArtistItem
}

export const SearchArtistItem = ({ artist }: Props) => {
  return (
    <Link href={`/artist/${artist.id}`} className="flex flex-col items-center space-y-2 p-3 xl:p-4 hover:bg-card rounded-xl cursor-pointer transition-colors">
      <img className="size-20 xl:size-24 rounded-full object-cover" src={artist?.images[1].url} alt={artist?.name + " profile image"} />
      <div className="text-center">
        <p className="line-clamp-2 text-sm">{artist?.name}</p>
        <p className="text-xs text-neutral-400">Artista</p>
      </div>
    </Link>
  )
}