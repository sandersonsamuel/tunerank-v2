import { SpotifyAlbum } from "@/types/spotify/album"

type Props = {
  album: SpotifyAlbum
}

export const Album = ({ album }: Props) => {
  return (
    <div className="max-w-[132px] space-y-2 p-3 xl:p-4 hover:bg-card rounded-xl cursor-pointer transition-colors">
      <img className="w-[80px] xl:w-[100px] rounded-xl" src={album?.images[1].url} alt={album?.name + " profile image"} />
      <div>
        <p className="line-clamp-2">{album?.name}</p>
        <p className="text-sm text-neutral-400">Album</p>
      </div>
    </div>
  )
}