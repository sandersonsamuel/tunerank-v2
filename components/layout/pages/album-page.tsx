"use client"

import { AlbumLikeButton } from "@/components/features/likes/like-album"
import { AlbumRatingCard } from "@/components/features/rating/rating-album-card"
import { AlbumReviewsList } from "@/components/features/rating/album-reviews"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SpotifyAlbum } from "@/types/spotify/album"
import { toPng } from "html-to-image"
import { ListMusic, Share2 } from "lucide-react"
import Link from "next/link"
import { useCallback, useRef, useState } from "react"
import { ShareButton } from "@/components/shared/share-button"

type Props = {
    album: SpotifyAlbum
}

export const AlbumPageContainer = ({ album }: Props) => {

    const ref = useRef<HTMLDivElement>(null)
    const [isSaving, setIsSaving] = useState(false)

    const onSaveAvaliation = useCallback(() => {
        if (ref.current === null) {
            return
        }
        setIsSaving(true)

        requestAnimationFrame(() => {
            toPng(ref.current!, {
                cacheBust: true,
                pixelRatio: 2,
            })
                .then((dataUrl) => {
                    const link = document.createElement('a')
                    link.download = `${album.name}.png`
                    link.href = dataUrl
                    link.click()
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    setIsSaving(false)
                })
        })
    }, [ref, album.name])

    return (
        <div className={cn("flex flex-col items-center gap-4 px-3 mt-7 bg-background", isSaving && "p-10 mt-0 max-w-[550px]")} ref={ref}>
            <img className="w-[180px] h-[180px] object-cover rounded-lg" src={album.images[0].url} alt={album.name + " album photo"} />
            <div className="flex flex-col items-center">
                <p className="text-3xl font-bold line-clamp-2 text-center">{album.name}</p>
                <p className="text-slate-400 line-clamp-1 text-center">{album.artists[0].name} - {album.release_date.slice(0, 4)}</p>
                {!isSaving && <p className="text-slate-400">{album.total_tracks} faixas</p>}
            </div>

            {
                !isSaving && (
                    <div className="flex gap-2">
                        <AlbumLikeButton albumId={album.id} />
                        <Link href={`/album/${album.id}/tracks`}>
                            <Button variant="outline" size={"icon-lg"}>
                                <ListMusic className="size-5" />
                            </Button>
                        </Link>
                        <ShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/album/${album.id}`} title={album.name} type="album" artist={album.artists[0].name} />
                    </div>
                )
            }

            <AlbumRatingCard albumId={album.id} onSaveAvaliation={onSaveAvaliation} isSaving={isSaving} />

            {
                !isSaving && <AlbumReviewsList albumId={album.id} />
            }
        </div>
    )
}
