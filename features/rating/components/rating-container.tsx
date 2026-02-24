"use client"

import { ReleaseItem } from "@/components/features/rating/release-item"
import { useUserRates } from "../hooks/rating.hooks"

export const RatingContainer = () => {

    const { data } = useUserRates()

    if (data) {

        const { albums, tracks } = data

        return (
            <div className="flex flex-col gap-4 px-3">

                <h2 className="text-xl font-bold">Minhas avaliações</h2>

                <h2>Álbuns</h2>

                {albums?.map((rate) => {

                    const lastImage = rate.album.images[rate.album.images.length - 1]

                    return (
                        <ReleaseItem key={rate.releaseId} img={lastImage.url || ""} name={rate.album.name || ""} artist={rate.album.artists[0].name || ""} type="album" id={rate.releaseId} rating={rate.rating} />
                    )
                })}


                <h2>Faixas</h2>
                {tracks?.map((rate) => {

                    const lastImage = rate.track.images[rate.track.images.length - 1]

                    return (
                        <ReleaseItem key={rate.releaseId} img={lastImage.url || ""} name={rate.track.name || ""} artist={rate.track.artists[0].name || ""} type="track" id={rate.releaseId} rating={rate.rating} />
                    )
                })}

            </div>
        )
    }
}