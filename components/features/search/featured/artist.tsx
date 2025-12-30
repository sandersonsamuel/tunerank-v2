"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { saveArtist } from "@/dexie/artists"
import { translateType } from "@/lib/utils"
import { SpotifyArtistItem } from "@/types/spotify/artist"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  featuredResult: SpotifyArtistItem,
}

export const FeaturedArtist = ({ featuredResult }: Props) => {

  const router = useRouter()
  const path = usePathname()

  const redirectToArtist = () => {
    saveArtist(featuredResult)
    if (path === `/artist/${featuredResult.id}`) {
      router.back()
    }
    router.push(`/artist/${featuredResult.id}`)
  }


  return (
    <Card onClick={redirectToArtist} className="group max-w-[500px] gap-2 hover:cursor-pointer bg-card/50 hover:bg-card transition-colors">
      <CardHeader>
        <CardTitle className="text-2xl">
          <img className="size-24 sm:size-32 rounded-full" src={featuredResult?.images[1].url} alt={`${featuredResult?.name} cover`} />
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div>
          <p className="text-xl sm:text-3xl font-black">{featuredResult?.name}</p>
          <span className="text-sm font-bold">
            <b className="text-neutral-400"> {translateType(featuredResult.type)}</b>
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}