"use client"

import { useAlbumRates } from "@/http/features/rating/hooks"
import { ReviewsChart } from "./public-reviews"

type Props = {
  albumId: string
}

export const AlbumReviewsList = ({ albumId }: Props) => {

  const { data: rates } = useAlbumRates(albumId)

  if (rates) {
    return (
      <ReviewsChart rates={rates} />
    )
  }
}