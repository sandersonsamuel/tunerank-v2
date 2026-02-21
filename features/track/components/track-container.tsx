"use client"

import { TrackRatingCard } from "@/components/features/rating/rating-track-card"
import { TrackReviewsList } from "@/components/features/rating/track-reviews"
import { ShareButton } from "@/components/shared/share-button"
import { cn } from "@/lib/utils"
import { toPng } from "html-to-image"
import { useCallback, useRef, useState } from "react"
import { useTrack } from "../hooks/track.hooks"
import { useLike } from "@/features/like/hooks/like.hook"
import { LikeRelease } from "@/components/features/likes/like-release"

type Props = {
    id: string
}

export const TrackContainer = ({ id }: Props) => {

    const { data: track } = useTrack(id)
    const { data: like } = useLike(id)

    if (!track) {
        return <div>Track not found</div>
    }

    const firstArtist = track.artists[0] || "Artista desconhecido"
    const restArtists = track.artists.slice(1, 6)
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
                    link.download = `${track.name}.png`
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
    }, [ref, track.name])


    return (
        <div className={cn("flex flex-col items-center gap-4 px-3 mt-7 bg-background", isSaving && "p-10 mt-0 max-w-[550px]")} ref={ref}>
            <img className="w-40 sm:w-60" src="/Tune_Rank.svg" alt="logo tune rank" />
            <img className="w-[180px] h-[180px] object-cover rounded-lg" src={track.album.images[0].url} alt={track.name + "album photo"} />
            <div className="flex flex-col items-center gap-2">
                <p className="text-3xl font-bold line-clamp-2 text-center">{track.name}</p>
                <p className="line-clamp-1 text-center">{firstArtist.name} - {track.album.release_date.slice(0, 4)}</p>
                <div className="flex flex-wrap items-start justify-center gap-2 line-clamp-1">
                    {restArtists.map((artist, index) => (
                        <a key={artist.id} href={`/artist/${artist.id}`} target="_blank" className="text-slate-400 text-sm flex items-center gap-2 hover:underline whitespace-nowrap">
                            {artist.name}
                            {index !== restArtists.length - 1 && ","}
                        </a>
                    ))}
                </div>
            </div>

            {
                !isSaving && (
                    <div className="flex gap-2">
                        <LikeRelease releaseId={id} like={like} type="TRACK" />
                        <ShareButton url={`/track/${id}`} title={track.name} type="track" artist={firstArtist.name} />
                    </div>
                )
            }

            <TrackRatingCard key={id} trackId={id} onSaveAvaliation={onSaveAvaliation} isSaving={isSaving} />

            {
                !isSaving && <TrackReviewsList trackId={id} />
            }
        </div>
    )
}