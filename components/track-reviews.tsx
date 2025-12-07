"use client"

import { getTrackRates } from "@/api/hooks/queries/track-rates"
import { useQuery } from "@tanstack/react-query"
import { PublicReviews } from "./rating/public-reviews"


type Props = {
  trackId: string
}

export const TrackReviews = ({ trackId }: Props) => {

  const { data: rates } = useQuery({
    queryKey: ["track-rates", trackId],
    queryFn: () => getTrackRates(trackId),
    enabled: !!trackId
  })

  if (rates) {
    return (
      <PublicReviews rates={rates} />
    )
  }
}