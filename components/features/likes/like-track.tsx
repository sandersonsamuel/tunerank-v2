"use client"

import { likeTrack as likeTrackService, unlikeTrack as unlikeTrackService } from "@/http/features/likes/services"
import { useGetLikeTrack } from "@/http/features/likes/hooks"
import { userState } from "@/valtio"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSnapshot } from "valtio"
import { LikeTrackIcon } from "@/components/ui/like-button"

type Props = {
  trackId: string
}


export const TrackLikeButton = ({ trackId }: Props) => {

  const router = useRouter()
  const { data } = useSnapshot(userState)
  const queryClient = useQueryClient()

  const { mutate: likeTrack } = useMutation({
    mutationFn: likeTrackService
  })

  const { mutate: unLikeTrack } = useMutation({
    mutationFn: unlikeTrackService
  })

  const { data: likeTrackQuery, isLoading } = useGetLikeTrack({ userId: data?.uid, trackId })

  const handleClick = () => {
    if (!data?.uid) {
      return router.push("/login")
    }
    if (!likeTrackQuery) {
      likeTrack({ trackId, userId: data.uid })
      queryClient.setQueryData(["like-track", data.uid, trackId], true)
    } else {
      unLikeTrack({ trackId, userId: data.uid })
      queryClient.setQueryData(["like-track", data.uid, trackId], false)
    }
  }

  return (
    <LikeTrackIcon handleClick={handleClick} isLoading={isLoading} like={likeTrackQuery} />
  )
}