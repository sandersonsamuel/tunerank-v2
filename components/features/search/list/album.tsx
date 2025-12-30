import { saveAlbum } from "@/dexie/albuns"
import { SpotifyAlbum } from "@/types/spotify/album"
import Link from "next/link"

type Props = {
  album: SpotifyAlbum
}

export const SearchAlbumItem = ({ album }: Props) => {

  const handleClick = () => {
    saveAlbum(album)
  }

  const image = album?.images[1] || album?.images[0] || album?.images[2]

  return (
    <Link href={`/album/${album.id}`} onClick={handleClick}>
      <div className="max-w-[132px] space-y-2 p-3 xl:p-4 hover:bg-card rounded-xl cursor-pointer transition-colors">
        <img className="w-[80px] xl:w-[100px] rounded-xl" src={image?.url} alt={album?.name + " profile image"} />
        <div>
          <p className="line-clamp-2">{album?.name}</p>
          <p className="text-sm text-neutral-400">Album</p>
        </div>
      </div>
    </Link>
  )
}