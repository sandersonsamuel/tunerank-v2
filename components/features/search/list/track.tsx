"use client"

import { saveTrack } from "@/dexie/tracks"
import { cn } from "@/lib/utils"
import { SpotifyTrackItemInAlbum } from "@/types/spotify/album"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { Heart } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

type Props = {
  track: SpotifyTrackItem | SpotifyTrackItemInAlbum
  isLiked?: boolean
}

export const SearchTrackItem = ({ track, isLiked = false }: Props) => {

  const router = useRouter()

  const handleClick = () => {
    if ("album" in track) {
      saveTrack(track as SpotifyTrackItem)
    }
    router.push(`/track/${track.id}`)
  }

  return (
    <motion.div whileTap={{ scale: 0.97, backgroundColor: "var(--card)" }} onClick={handleClick} className="flex w-full min-h-[80px] items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer px-4 relative">
      <div className="flex gap-3">
        {
          "album" in track && <img className={"size-16 rounded-xl object-cover"} src={track?.album?.images[0].url || track?.album?.images[1].url || track?.album?.images[2].url} alt={`${track?.name} cover`} />
        }
        <div className="flex flex-col justify-center">
          <p className="line-clamp-2 text- lg:text-lg font-bold">{track?.name}</p>
          <span className="text-xs font-bold">
            {track?.artists?.map((artist, index) => (
              <span key={artist.id} className="hover:underline text-neutral-400">
                {index > 0 && ", "}
                {artist.name}
              </span>
            ))}
          </span>
        </div>
      </div>
      {isLiked && <Heart className="absolute top-4 right-4 w-4 h-4 fill-primary text-primary/80" />}
    </motion.div>
  )
}