"use client"

import { ReleaseItem } from "@/components/release-item"
import { useUserRates } from "../hooks/rating.hooks"

export const RatingContainer = () => {

    const { data } = useUserRates()

    if (data) {

        const { albums, tracks } = data

        return (
            <div className="flex flex-col gap-4 px-3">

                <h2 className="text-xl font-bold">Minhas avaliações</h2>

                <h2>Álbuns</h2>

                {
                    albums?.length === 0 || !albums && (
                        <p className="text-neutral-400">Nenhum álbum avaliado</p>
                    )
                }

                {albums?.map((rate) => {

                    const lastImage = rate.album.images[rate.album.images.length - 1]

                    return (
                        <ReleaseItem key={rate.releaseId} img={lastImage.url || ""} name={rate.album.name || ""} artist={rate.album.artists[0].name || ""} type="album" id={rate.releaseId} rating={rate.rating} />
                    )
                })}


                <h2>Faixas</h2>

                {
                    tracks?.length === 0 || !tracks && (
                        <p className="text-neutral-400">Nenhuma faixa avaliada</p>
                    )
                }

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