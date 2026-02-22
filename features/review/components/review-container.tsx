"use client"

import { ReleaseItem } from "@/components/features/rating/release-item"
import { useUserReviews } from "../hooks/review.hooks"

export const ReviewContainer = () => {

    const { data } = useUserReviews()

    if (data) {

        const { albums, tracks } = data

        return (
            <div className="flex flex-col gap-4 px-3">

                <h2 className="text-xl font-bold">Minhas avaliações</h2>

                <h2>Álbuns</h2>
                
                {albums?.map((review) => {

                    const lastImage = review.album.images[review.album.images.length - 1]

                    return (
                        <ReleaseItem key={review.releaseId} img={lastImage.url || ""} name={review.album.name || ""} artist={review.album.artists[0].name || ""} type="album" id={review.releaseId} rating={review.rating} />
                    )
                })}


                <h2>Faixas</h2>
                {tracks?.map((review) => {

                    const lastImage = review.track.album.images[review.track.album.images.length - 1]

                    return (
                        <ReleaseItem key={review.releaseId} img={lastImage.url || ""} name={review.track.name || ""} artist={review.track.artists[0].name || ""} type="track" id={review.releaseId} rating={review.rating} />
                    )
                })}

            </div>
        )
    }
}