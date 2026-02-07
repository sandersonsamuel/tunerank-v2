import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Heart } from "lucide-react"
import { motion } from "motion/react"

type Props = {
  handleClick?: () => void
  isLoading?: boolean
  like?: boolean
}

export const LikeButton = ({ handleClick, isLoading, like }: Props) => {

  return (
    <motion.span whileTap={{ scale: 0.7 }} onClick={handleClick}>
      <Button variant="outline" size={"icon-lg"} disabled={isLoading}>
        <Heart className={cn("size-5", like && "fill-primary text-primary", isLoading && "animate-pulse")} />
      </Button>
    </motion.span>
  )
}
