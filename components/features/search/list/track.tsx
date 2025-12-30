"use client"

import { saveTrack } from "@/dexie/tracks"
import { SpotifyTrackItemInAlbum } from "@/types/spotify/album"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

type Props = {
  track: SpotifyTrackItem | SpotifyTrackItemInAlbum
}

export const SearchTrackItem = ({ track }: Props) => {

  const router = useRouter()

  const handleClick = () => {
    // Only save if it's a SpotifyTrackItem (which has full info)
    // Assuming for now simple saving is enough or type guard needed
    if ("album" in track) {
      saveTrack(track as SpotifyTrackItem)
    }
    router.push(`/track/${track.id}`)
  }

  return (
    <motion.div whileTap={{ scale: 0.97, backgroundColor: "var(--card)" }} onClick={handleClick} className="flex w-full min-h-[80px] items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer px-4">
      <div className="flex gap-3">
        {
          "album" in track && <img className="size-16 rounded-xl object-cover" src={track?.album?.images[0].url || track?.album?.images[1].url || track?.album?.images[2].url} alt={`${track?.name} cover`} />
        }
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
    </motion.div>
  )
}