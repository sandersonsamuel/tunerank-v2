"use client"

import { Track } from "@/features/track/types/track.type"
import { getLastImage } from "@/lib/utils"
import { Heart } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

type Props = {
  track: Track
  isLiked?: boolean
  minutes?: boolean
  img?: boolean
}

export const SearchTrackItem = ({ track, isLiked = false, minutes = false, img = true }: Props) => {

  return (
    <Link href={`/track/${track.id}`}>
      <motion.div whileTap={{ scale: 0.97, backgroundColor: "var(--card)" }} className="flex w-full min-h-[80px] items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer px-4 relative">
        <div className="flex gap-3">

          {img && <img className={"size-16 rounded-xl object-cover"} src={getLastImage(track.images)} alt={`${track?.name} cover`} />}

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
    </Link>
  )
}