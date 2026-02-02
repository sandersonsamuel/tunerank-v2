
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useGetRatingTrack } from "@/http/features/rating/hooks"
import { postRatingTrack } from "@/http/features/rating/track-services"
import { RateTrack } from "@/types/rate"
import { userState } from "@/valtio"
import { useQueryClient } from "@tanstack/react-query"
import { User } from "firebase/auth"
import { Timestamp } from "firebase/firestore"
import { Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useSnapshot } from "valtio"
import { StarRatingInput } from "./star-rate-container"

type Props = {
  trackId: string
  onSaveAvaliation: () => void  
  isSaving: boolean
}

export const TrackRatingCard = ({ trackId, onSaveAvaliation, isSaving }: Props) => {

  const router = useRouter()
  const [rate, setRate] = useState(0)
  const [comment, setComment] = useState("")
  const { data } = useSnapshot(userState)
  const { data: rating } = useGetRatingTrack(trackId, data?.uid)
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
      postRatingTrack(rate, comment, trackId, user).then(() => {
        const newRating: RateTrack = {
          userId: user.uid,
          trackId: trackId,
          rating: rate,
          review: comment,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }

        queryClient.setQueryData(["rating-track", trackId, user.uid], newRating)
        queryClient.invalidateQueries({ queryKey: ["rating-track", trackId, user.uid] })
        queryClient.invalidateQueries({ queryKey: ["track-rates", trackId] })
      })
    } else {
      router.push("/login")
    }
  }

  const isUpdateMode = !!rating && rating.rating > 0

  return (
    <Card className="w-full rounded-3xl p-4 max-w-[500px] gap-0 relative">
      <CardHeader className="flex">
        <CardTitle className="text-center text-slate-500 w-full mb-3">{isSaving ? "Minha avaliação" : "Avalie essa música"}</CardTitle>
        <CardAction className="absolute right-4 top-2">
          {
            isUpdateMode && !isSaving && (
              <Button variant={"outline"} size={"sm"} className="mt-2 self-end" onClick={onSaveAvaliation}><Download /></Button>
            )
          }
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col items-center px-0">
        <StarRatingInput rate={rate} setRate={setRate} />
        
        {
          !isSaving && !comment && (
            <Textarea placeholder="Escreva sua avaliação aqui" className="mt-4 text-xs" value={comment} onChange={(e) => setComment(e.target.value)} />
          )
        }
        
        {
          !isSaving && (
            <div className="flex gap-2 w-full justify-end">
              <Button disabled={rate === 0} size={"sm"} className="mt-2 self-end" onClick={submitAvaliation}>{isUpdateMode ? "Atualizar avaliação" : "Enviar avaliação"}</Button>
            </div>
          )
        }

      </CardContent>
    </Card>
  )
}