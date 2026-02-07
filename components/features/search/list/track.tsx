"use client"

import { saveTrack } from "@/dexie/tracks"
import { SpotifyTrackItemInAlbum } from "@/types/spotify/album"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { Heart } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

type Props = {
  track: SpotifyTrackItem | SpotifyTrackItemInAlbum
  isLiked?: boolean
  minutes?: boolean
}

export const SearchTrackItem = ({ track, isLiked = false, minutes = false }: Props) => {

  const handleClick = () => {
    if ("album" in track) {
      saveTrack(track as SpotifyTrackItem)
    }
  }

  const duration = track.duration_ms / 1000 / 60
  const durationFormated = `${Math.floor(duration)}:${Math.floor((duration - Math.floor(duration)) * 60)}`

  return (
    <Link href={`/track/${track.id}`} onClick={handleClick}>
      <motion.div whileTap={{ scale: 0.97, backgroundColor: "var(--card)" }} className="flex w-full min-h-[80px] items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer px-4 relative">
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
        {minutes && <p className="text-sm font-bold text-neutral-400">{durationFormated}</p>}
      </motion.div>
    </Link>
  )
}