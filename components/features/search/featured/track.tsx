"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { saveTrack } from "@/dexie/tracks"
import { translateType } from "@/lib/utils"
import { SpotifyTrackItem } from "@/types/spotify/track"
import { motion } from "motion/react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  featuredResult: SpotifyTrackItem,
}

export const FeaturedTrack = ({ featuredResult }: Props) => {

  const router = useRouter()
  const path = usePathname()

  const artists = featuredResult?.artists?.map((artist, index) => (
    <span key={artist.id}>
      {index > 0 && ", "}
      <a className="hover:underline" href={`/artist/${artist.id}`}>
        {artist.name}
      </a>
    </span>
  ))

  const redirectToTrack = () => {
    saveTrack(featuredResult)
    if (path === `/track/${featuredResult.id}`) {
      router.back()
    }
  }

  return (
    <Card onClick={redirectToTrack} className="group w-full lg:w-[500px] gap-2 hover:cursor-pointer bg-card/50 hover:bg-card transition-colors">
      <CardHeader>
        <CardTitle className="text-2xl">
          <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.1 }} className="size-24 sm:size-32 rounded-xl" src={featuredResult?.album?.images[1].url} alt={`${featuredResult?.album?.name} cover`} />
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between items-center gap-1">
        <div>
          <p className="text-xl sm:text-3xl font-black line-clamp-2">{featuredResult?.name}</p>
          <span className="text-sm font-bold">
            <b>{featuredResult?.explicit ? "E" : null}</b>
            <b className="text-neutral-400"> {translateType(featuredResult.type)}</b>
            <span> {artists}</span>
          </span>
        </div>
        <div className="hidden sm:flex">
          <Link href={featuredResult?.external_urls?.spotify} target="_blank">
            <img className="min-w-[40px] min-h-[40px] scale-0 transition-all duration-200 group-hover:scale-100" src="Spotify_icon.svg" alt="spotify logo" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}