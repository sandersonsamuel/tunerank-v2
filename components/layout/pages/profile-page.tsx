"use client"

import { LogoutButton } from "@/components/features/profile/logout"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/auth.hooks"
import { useUserLikes } from "@/features/like/hooks/like.hook"
import { useUserReviews } from "@/features/review/hooks/review.hooks"
import { DiscAlbum, Heart, Music, StarIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

export default function ProfileContainer() {

    const { data: user } = useAuth()

    const userLetters = user?.name?.split(" ").map((name) => name[0]).join("").toUpperCase()
    const { data: reviews } = useUserReviews()
    const { data: likes } = useUserLikes()

    return (
        <div className="flex flex-col items-center w-full px-3">

            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center size-[130px] bg-accent rounded-full">
                    <p className="text-5xl font-bold">{userLetters}</p>
                </div>

                <span className="flex flex-col items-center">
                    <p className="text-xl font-bold line-clamp-1">{user?.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{user?.email}</p>
                </span>
            </div>

            <div className="grid grid-cols-2 w-full gap-5 mt-10">
                <InfoSquareCard icon={<DiscAlbum className="size-12 p-2 bg-background rounded-full border border-slate-800 text-primary" />} value={reviews?.albums.length} label="Albuns avaliados" />
                <InfoSquareCard icon={<Music className="size-12 p-2 bg-background rounded-full border border-slate-800 text-primary" />} value={reviews?.tracks.length} label="Musicas avaliadas" />

                <InfoSquareCard icon={<Heart className="size-12 p-2 bg-background rounded-full border border-slate-800 text-destructive" />} value={likes?.albums.length} label="Albuns curtidos" />
                <InfoSquareCard icon={<Heart className="size-12 p-2 bg-background rounded-full border border-slate-800 text-destructive" />} value={likes?.tracks.length} label="Musicas curtidas" />
            </div>

            <h2 className="text-xl mt-5 w-full text-left text-neutral-300">Biblioteca</h2>

            <Link href={"/my/reviews"} className="flex flex-col gap-2 w-full mt-3">
                <Button variant="outline" size={"lg"} className="w-full justify-start py-7 text-lg">
                    <StarIcon className="size-6 mr-2" /> Minhas avaliações
                </Button>
            </Link>
            <Link href={"/my/likes"} className="flex flex-col gap-2 w-full mt-3">
                <Button variant="outline" size={"lg"} className="w-full justify-start py-7 text-lg">
                    <Heart className="size-6 mr-2" /> Minhas curtidas
                </Button>
            </Link>

            <h2 className="text-xl mt-5 w-full text-left text-neutral-300">Conta</h2>

            <div className="flex flex-col gap-2 w-full mt-3">
                <LogoutButton />
            </div>
        </div>
    )
}

interface InfoSquareCardProps {
    icon: React.ReactNode
    value?: number
    label: string
}

const InfoSquareCard = ({ icon, value = 0, label }: InfoSquareCardProps) => {
    return (
        <motion.div whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center bg-card w-full aspect-square rounded-xl gap-1">
            {icon}
            <p className="text-3xl text-bold">{value}</p>
            <p className="text-xs text-neutral-400">{label}</p>
        </motion.div>
    )
}