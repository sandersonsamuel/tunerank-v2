import { SpotifyTrackItem } from "@/types/spotify/track"

type Props = {
  track: SpotifyTrackItem
}

export const Track = ({ track }: Props) => {
  return (
    <div className="flex w-full items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer pr-4">
      <div className="flex gap-3">
        <img className="size-16 rounded-xl" src={track?.album?.images[2].url} alt={`${track?.name} cover`} />
        <div className="flex flex-col justify-center">
          <p className="line-clamp-2 text- lg:text-lg font-bold">{track?.name}</p>
          <span className="text-xs font-bold">
            {track?.artists?.map((artist, index) => (
              <span key={artist.id}>
                {index > 0 && ", "}
                <a className="hover:underline text-neutral-400" href={`/artist/${artist.id}`}>
                  {artist.name}
                </a>
              </span>
            ))}
          </span>
        </div>
      </div>
      {/* <div className="flex gap-2 items-center">
        <StarIcon size="md" />
        <Link href={track?.external_urls?.spotify} target="_blank"><img className="size-6" src="Spotify_icon.svg" alt="spotify logo" /></Link>
      </div> */}
    </div>
  )
}