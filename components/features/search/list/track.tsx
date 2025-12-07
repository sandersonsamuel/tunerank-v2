"use client"

import { SpotifyTrackItem } from "@/types/spotify/track"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

type Props = {
  track: SpotifyTrackItem
}

export const SearchTrackItem = ({ track }: Props) => {

  const router = useRouter()

  return (
    <motion.div whileTap={{ scale: 0.97, backgroundColor: "var(--card)" }} onClick={() => router.push(`/track/${track.id}`)} className="flex w-full items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer pr-4">
      <div className="flex gap-3">
        <img className="size-16 rounded-xl object-cover" src={track?.album?.images[2].url} alt={`${track?.name} cover`} />
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