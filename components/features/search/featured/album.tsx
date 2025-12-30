"use client"

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { saveAlbum } from "@/dexie/albuns"
import { useAlbumRates } from "@/http/features/rating/hooks"
import { cn, translateType } from "@/lib/utils"
import { SpotifyAlbum } from "@/types/spotify/album"
import { CircleStar } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  featuredResult: SpotifyAlbum
}

export const FeaturedAlbum = ({ featuredResult }: Props) => {

  const { data: rates } = useAlbumRates(featuredResult.id)
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

  const redirectToAlbum = () => {
    saveAlbum(featuredResult)
    if (path === `/album/${featuredResult.id}`) {
      router.back()
    }
    router.push(`/album/${featuredResult.id}`)
  }

  return (
    <Card onClick={redirectToAlbum} className="group max-w-[500px] gap-2 hover:cursor-pointer bg-card/50 hover:bg-card transition-colors">
      <CardHeader>
        <CardTitle className="text-2xl">
          <img className="size-24 sm:size-32 rounded-xl" src={featuredResult?.images[1].url} alt={`${featuredResult?.name} cover`} />
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between items-end">
        <div>
          <p className="text-xl sm:text-3xl font-black line-clamp-2">{featuredResult?.name}</p>
          <span className="text-sm font-bold">
            <b className="text-neutral-400"> {translateType(featuredResult.type)}</b>
            <span> {artists}</span>
          </span>
        </div>
        {
          rates && (
            <span className="text-sm font-bold flex items-center gap-1">
              {
                rates.total > 0 && (
                  <b className="text-xl"> {rates?.average}</b>
                )
              }
              <CircleStar className={cn(rates.average < 3 && rates.total > 0 ? "text-red-400" : rates.average >= 3 && rates.average < 4 && rates.total > 0 ? "text-yellow-400" : rates.average >= 4 && rates.total > 0 ? "text-blue-400" : "text-gray-400")} />
            </span>
          )
        }
        <div className="hidden sm:flex">
          <Link href={featuredResult?.external_urls?.spotify} target="_blank">
            <img className="min-w-[40px] min-h-[40px] scale-0 transition-all duration-200 group-hover:scale-100" src="Spotify_icon.svg" alt="spotify logo" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}