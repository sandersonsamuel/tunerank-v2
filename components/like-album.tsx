"use client"

import { likeAlbumMutation, unLikeAlbumMutation } from "@/api/hooks/mutations/like-album"
import { useGetLikeAlbum } from "@/api/hooks/queries/like-album"
import { userState } from "@/valtio"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSnapshot } from "valtio"
import { LikeTrackIcon } from "./ui/like-button"

type Props = {
  albumId: string
}

export const LikeAlbum = ({ albumId }: Props) => {

  const router = useRouter()
  const { data } = useSnapshot(userState)
  const { mutate: likeAlbum } = useMutation({
    mutationFn: likeAlbumMutation
  })
  const queryClient = useQueryClient()

  const { mutate: unLikeAlbum } = useMutation({
    mutationFn: unLikeAlbumMutation
  })

  const { data: likeAlbumQuery, isLoading } = useGetLikeAlbum({ userId: data?.uid, albumId })

  const handleClick = () => {
    if (!data?.uid) {
      return router.push("/login")
    }
    if (!likeAlbumQuery) {
      likeAlbum({ albumId, userId: data.uid })
      queryClient.setQueryData(["like-album", data.uid, albumId], true)
    } else {
      unLikeAlbum({ albumId, userId: data.uid })
      queryClient.setQueryData(["like-album", data.uid, albumId], false)
    }
  }

  return (
    <LikeTrackIcon handleClick={handleClick} isLoading={isLoading} like={likeAlbumQuery} />
  )
}