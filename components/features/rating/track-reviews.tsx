"use client"

import { useTrackRates } from "@/http/features/rating/hooks"
import { useQuery } from "@tanstack/react-query"
import { ReviewsChart } from "./public-reviews"


type Props = {
  trackId: string
}

export const TrackReviewsList = ({ trackId }: Props) => {

  const { data: rates } = useTrackRates(trackId)

  if (rates) {
    return (
      <ReviewsChart rates={rates} />
    )
  }
}