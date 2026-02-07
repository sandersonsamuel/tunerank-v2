"use client"

import { likeAlbum as likeAlbumService, unlikeAlbum as unlikeAlbumService } from "@/http/features/likes/services"
import { useGetLikeAlbum } from "@/http/features/likes/hooks"
import { userState } from "@/valtio"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSnapshot } from "valtio"
import { LikeButton } from "@/components/ui/like-button"

type Props = {
  albumId: string
}

export const AlbumLikeButton = ({ albumId }: Props) => {

  const router = useRouter()
  const { data } = useSnapshot(userState)
  const queryClient = useQueryClient()

  const { mutate: likeAlbum } = useMutation({
    mutationFn: likeAlbumService
  })

  const { mutate: unLikeAlbum } = useMutation({
    mutationFn: unlikeAlbumService
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
    <LikeButton handleClick={handleClick} isLoading={isLoading} like={likeAlbumQuery} />
  )
}