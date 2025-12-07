
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { postRatingAlbum } from "@/http/features/rating/album-services"
import { useGetRatingAlbum } from "@/http/features/rating/hooks"
import { RateAlbum } from "@/types/rate"
import { userState } from "@/valtio"
import { useQueryClient } from "@tanstack/react-query"
import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSnapshot } from "valtio"
import { StarRatingInput } from "./star-rate-container"

type Props = {
  albumId: string
}

export const AlbumRatingCard = ({ albumId }: Props) => {

  const router = useRouter()
  const [rate, setRate] = useState(0)
  const [comment, setComment] = useState("")
  const { data } = useSnapshot(userState)
  const { data: rating } = useGetRatingAlbum(albumId, data?.uid)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (rating) {
      setRate(rating.rating)
      setComment(rating.review || "")
    }
  }, [rating])

  const submitAvaliation = () => {

    if (rate === 0) {
      return toast.error("A avaliação precisa ser de no mínimo 0.5 estrelas")
    }

    if (data) {
      const user = data as User
      postRatingAlbum(rate, comment, albumId, user).then(() => {
        const newRating: RateAlbum = {
          userId: user.uid,
          albumId: albumId,
          rating: rate,
          review: comment,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }

        queryClient.setQueryData(["rating-album", albumId, user.uid], newRating)
        queryClient.invalidateQueries({ queryKey: ["rating-album", albumId, user.uid] })
        queryClient.invalidateQueries({ queryKey: ["album-rates", albumId] })
      })
    } else {
      router.push("/login")
    }
  }

  const isUpdateMode = !!rating && rating.rating > 0

  return (
    <Card className="w-full rounded-3xl p-4 max-w-[500px] gap-0">
      <CardHeader className="text-center text-slate-500">Avalie esse álbum</CardHeader>
      <CardContent className="flex flex-col items-center px-0">
        <StarRatingInput rate={rate} setRate={setRate} />
        <Textarea placeholder="Escreva sua avaliação aqui" className="mt-4 text-xs" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button disabled={rate === 0} size={"sm"} className="mt-2 self-end" onClick={submitAvaliation}>{isUpdateMode ? "Atualizar avaliação" : "Enviar avaliação"}</Button>
      </CardContent>
    </Card>
  )
}