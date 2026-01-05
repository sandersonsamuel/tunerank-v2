import { Share2 } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

type Props = {
  url: string
  title: string
  type: "track" | "album"
}

export const ShareButton = ({ url, title, type }: Props) => {
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
        <DropdownMenuItem>Link {type === "track" ? "da faixa" : "do álbum"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}