import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { translateType } from "@/lib/utils"
import { SpotifyArtistItem } from "@/types/spotify/artist"
import Link from "next/link"

type Props = {
  betterResult: SpotifyArtistItem,
}

export const BetterResultArtist = ({ betterResult }: Props) => {

  return (
    <Card className="group max-w-[500px] gap-2 hover:cursor-pointer bg-card/50 hover:bg-card transition-colors">
      <CardHeader>
        <CardTitle className="text-2xl">
          <img className="size-24 sm:size-32 rounded-full" src={betterResult?.images[0].url} alt={`${betterResult?.name} cover`} />
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between items-center">
        <div>
          <p className="text-xl sm:text-3xl font-black line-clamp-2">{betterResult?.name}</p>
          <span className="text-sm font-bold">
            <b className="text-neutral-400"> {translateType(betterResult.type)}</b>
          </span>
        </div>
        <Link href={betterResult?.external_urls?.spotify} target="_blank">
          <img className="min-w-[40px] min-h-[40px] scale-0 transition-all duration-200 group-hover:scale-100" src="Spotify_icon.svg" alt="spotify logo" />
        </Link>
      </CardFooter>
    </Card>
  )
}