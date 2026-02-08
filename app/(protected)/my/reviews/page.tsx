"use client"

import { ReleaseItem } from "@/components/features/rating/release-item"
import { ReviewsSkeleton } from "@/components/features/rating/reviews-skeleton"
import { useReleasesByUserId } from "@/http/features/rating/hooks"
import { userState } from "@/valtio"
import { useSnapshot } from "valtio"

export default function ReviewsPage() {

    const user = useSnapshot(userState).data

    const { data: releases, isLoading } = useReleasesByUserId(user?.uid || "")

    if (isLoading && !releases) {
        return <ReviewsSkeleton />
    }

    if (!releases) {
        return null
    }

    if (releases.albums.length === 0 && releases.tracks.length === 0) {
        return <div>Nenhuma avaliação encontrada, pesquise e avalie álbuns e faixas para começar!</div>
    }

    const { albums, tracks } = releases

    return (
        <div className="flex flex-col gap-4 px-3">

            <h2 className="text-xl font-bold">Minhas avaliações</h2>

            <h2>Álbuns</h2>
            {albums?.map((album) => (
                <ReleaseItem key={album.releaseId} img={album.release?.images[1].url || ""} name={album.release?.name || ""} artist={album.release?.artists[0].name || ""} type="album" id={album.releaseId} rating={album.rating} />
            ))}


            <h2>Faixas</h2>
            {tracks?.map((track) => (
                <ReleaseItem key={track.releaseId} img={track.release?.album?.images[1].url || ""} name={track.release?.name || ""} artist={track.release?.artists[0].name || ""} type="track" id={track.releaseId} rating={track.rating} />
            ))}

        </div>
    )
}