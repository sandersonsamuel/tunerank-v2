"use client"

import { useGetRating } from "@/api/hooks/queries/rating"
import { postRating } from "@/api/hooks/mutations/rating"
import { Rate } from "@/types/rate"
import { userState } from "@/valtio"
import { useQueryClient } from "@tanstack/react-query"
import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSnapshot } from "valtio"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { StarRateContainer } from "./star-rate-container"

type Props = {
  trackId: string
}

export const RatingTrackCard = ({ trackId }: Props) => {

  const router = useRouter()
  const [rate, setRate] = useState(0)
  const [comment, setComment] = useState("")
  const { data } = useSnapshot(userState)
  const { data: rating } = useGetRating(trackId, data?.uid)
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
      postRating(rate, comment, trackId, user).then(() => {
        const newRating: Rate = {
          userId: user.uid,
          trackId: trackId,
          rating: rate,
          review: comment,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }

        queryClient.setQueryData(["rating", trackId, user.uid], newRating)
        queryClient.invalidateQueries({ queryKey: ["rating", trackId, user.uid] })
        queryClient.invalidateQueries({ queryKey: ["track-rates", trackId] })
      })
    } else {
      router.push("/login")
    }
  }

  const isUpdateMode = !!rating && rating.rating > 0

  return (
    <Card className="w-full rounded-3xl p-4 max-w-[500px] gap-0">
      <CardHeader className="text-center text-slate-500">Avalie essa música</CardHeader>
      <CardContent className="flex flex-col items-center px-0">
        <StarRateContainer rate={rate} setRate={setRate} />
        <Textarea placeholder="Escreva sua avaliação aqui" className="mt-4 text-xs" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button disabled={rate === 0} size={"sm"} className="mt-2 self-end" onClick={submitAvaliation}>{isUpdateMode ? "Atualizar avaliação" : "Enviar avaliação"}</Button>
      </CardContent>
    </Card>
  )
}