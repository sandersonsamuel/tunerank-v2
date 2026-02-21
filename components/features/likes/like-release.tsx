"use client"

import { LikeButton } from "@/components/ui/like-button"
import { createLike, deleteLike } from "@/features/like/http/like"
import { Like } from "@/features/like/types/like.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Props = {
  releaseId: string
  like?: Like
  type: "ALBUM" | "TRACK"
}

export const LikeRelease = ({ releaseId, like, type }: Props) => {

  const queryClient = useQueryClient()

  const { mutateAsync: createLikeFn } = useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like", releaseId] })
    }
  })
  const { mutateAsync: deleteLikeFn } = useMutation({
    mutationFn: deleteLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like", releaseId] })
    }
  })

  const handleClick = () => {
    if (like) {
      queryClient.setQueryData(["like", releaseId], null)
      deleteLikeFn(like.releaseId)
    } else {
      queryClient.setQueryData(["like", releaseId], { releaseId: releaseId, type: type })
      createLikeFn({ releaseId: releaseId, type: type })
    }
  }

  return (
    <LikeButton handleClick={handleClick} like={!!like} />
  )
}