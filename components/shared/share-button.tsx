import { Share2 } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

type Props = {
  url: string
  title: string
  artist: string
  type: "track" | "album"
}

export const ShareButton = ({ url, title, artist, type }: Props) => {

  const titleText = type === "track" ? "Avalie também essa faixa" : "Avalie também esse álbum"

  const handleShare = () => {
    navigator.share({
      title,
      text: `${titleText} "${title}" de ${artist} no TuneRank`,
      url,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon-lg"}>
          <Share2 className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Compartilhar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleShare}>Link {type === "track" ? "da faixa" : "do álbum"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}