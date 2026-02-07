import { useGetLikedAlbums } from "@/http/features/likes/hooks"
import { motion } from "motion/react"
import Link from "next/link"

type LikedAlbumsProps = {
  userId: string
}

export const LikedAlbums = ({ userId }: LikedAlbumsProps) => {
  
  const { data: likedAlbums } = useGetLikedAlbums({ userId })

  return (
    <Link href="/my/likes">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-col gap-3 items-center justify-center size-[150px] bg-card rounded-lg border-primary/20 border-2">
        <img src="/album-icon.svg" alt="Album icon" className="size-[70px]" />
        <span className="text-sm font-bold">{likedAlbums?.length} Álbuns</span>
      </motion.div>
    </Link>
  )
}