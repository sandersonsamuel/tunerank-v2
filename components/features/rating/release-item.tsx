import { StarIcon } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

type Props = {
    img: string
    name: string
    artist: string
    type: "album" | "track"
    rating?: number
    id: string
}

export const ReleaseItem = ({ img, name, artist, type, rating, id }: Props) => {

    const router = useRouter()

    return (
        <motion.div onClick={() => router.push(`/${type}/${id}`)} whileTap={{ scale: 0.97, backgroundColor: "var(--card)" }} className="flex w-full min-h-[80px] items-center justify-between hover:bg-card rounded-lg p-2 cursor-pointer px-4">
            <div className="flex gap-3">
                <img className="size-16 rounded-xl object-cover" src={img} alt={`${name} cover`} />

                <div className="flex flex-col justify-center">
                    <p className="line-clamp-1 text- lg:text-lg font-bold">{name}</p>
                    <span className="text-xs font-bold">
                        {artist}
                    </span>
                </div>
            </div>
            {rating && (
                <div className="flex items-center gap-2">
                    <p className="text-lg font-bold">{rating}</p>
                    <StarIcon className="size-5 fill-primary text-primary" />
                </div>
            )}
        </motion.div>
    )
}