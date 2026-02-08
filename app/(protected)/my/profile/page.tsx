"use client"

import { LogoutButton } from "@/components/features/profile/logout"
import { Button } from "@/components/ui/button"
import { useGetLikedAlbums, useGetLikedTracks } from "@/http/features/likes/hooks"
import { useReleasesByUserId } from "@/http/features/rating/hooks"
import { userState } from "@/valtio"
import { DiscAlbum, Heart, LogOut, Music, StarIcon } from "lucide-react"
import Link from "next/link"
import { useSnapshot } from "valtio"

export default function ProfilePage() {

    const { data: user } = useSnapshot(userState)

    const userLetters = user?.displayName?.split(" ").map((name) => name[0]).join("").toUpperCase()

    const { data: likedAlbums } = useGetLikedAlbums({ userId: user?.uid || "" })
    const { data: likedTracks } = useGetLikedTracks({ userId: user?.uid || "" })

    const { data: releases, isLoading } = useReleasesByUserId(user?.uid || "")

    return (
        <div className="flex flex-col items-center w-full px-3">

            <div className="flex flex-col items-center gap-3">
                <div className="flex items-center justify-center size-[130px] bg-accent rounded-full">
                    <p className="text-5xl font-bold">{userLetters}</p>
                </div>

                <span className="flex flex-col items-center">
                    <p className="text-xl font-bold line-clamp-1">{user?.displayName}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{user?.email}</p>
                </span>
            </div>

            <div className="grid grid-cols-2 w-full gap-5 mt-10">
                <div className="flex flex-col items-center justify-center bg-card w-full aspect-square rounded-xl gap-1">
                    <DiscAlbum  className="size-12 p-2 bg-background rounded-full border border-slate-800 text-primary"/>
                    <p className="text-3xl font-bold">{isLoading ? <span className="w-[18px] h-[36px] animate-pulse bg-slate-800 rounded-full"/> : releases?.albums.length}</p>
                    <p className="text-xs text-neutral-400">Albuns avaliados</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-card w-full aspect-square rounded-xl gap-1">
                    <Music  className="size-12 p-2 bg-background rounded-full border border-slate-800 text-primary"/>
                    <p className="text-3xl font-bold">{isLoading ? <span className="w-[18px] h-[36px] animate-pulse bg-slate-800 rounded-full"/> : releases?.tracks.length}</p>
                    <p className="text-xs text-neutral-400">Musicas avaliadas</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-card w-full aspect-square rounded-xl gap-1">
                    <Heart className="size-12 p-2 bg-background rounded-full border border-slate-800 text-destructive"/>
                    <p className="text-3xl text-bold">{likedAlbums?.length}</p>
                    <p className="text-xs text-neutral-400">Albuns curtidos</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-card w-full aspect-square rounded-xl gap-1">
                    <Heart className="size-12 p-2 bg-background rounded-full border border-slate-800 text-destructive"/>
                    <p className="text-3xl text-bold">{likedTracks?.length}</p>
                    <p className="text-xs text-neutral-400">Musicas curtidas</p>
                </div>
            </div>

            <h2 className="text-xl mt-5 w-full text-left text-neutral-300">Biblioteca</h2>

            <Link href={"/my/reviews"} className="flex flex-col gap-2 w-full mt-3">
                <Button variant="outline" size={"lg"} className="w-full justify-start py-7 text-lg">
                    <StarIcon className="size-6 mr-2"/> Minhas avaliações
                </Button>
            </Link>
            <Link href={"/my/likes"} className="flex flex-col gap-2 w-full mt-3">
                <Button variant="outline" size={"lg"} className="w-full justify-start py-7 text-lg">
                    <Heart className="size-6 mr-2"/> Minhas curtidas
                </Button>
            </Link>

            <h2 className="text-xl mt-5 w-full text-left text-neutral-300">Conta</h2>

            <div className="flex flex-col gap-2 w-full mt-3">
                <LogoutButton/>
            </div>
        </div>
    )
}