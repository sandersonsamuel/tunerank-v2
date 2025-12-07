"use client"

import { likeTrackMutation, unLikeTrackMutation } from "@/api/hooks/mutations/like-track"
import { useGetLikeTrack } from "@/api/hooks/queries/like-track"
import { userState } from "@/valtio"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSnapshot } from "valtio"
import { LikeTrackIcon } from "./ui/like-button"

type Props = {
  trackId: string
}


export const LikeTrack = ({ trackId }: Props) => {

  const router = useRouter()
  const { data } = useSnapshot(userState)
  const { mutate: likeTrack } = useMutation({
    mutationFn: likeTrackMutation
  })
  const queryClient = useQueryClient()

  const { mutate: unLikeTrack } = useMutation({
    mutationFn: unLikeTrackMutation
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