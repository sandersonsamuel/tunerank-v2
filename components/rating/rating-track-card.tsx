"use client"

import { Card, CardContent, CardHeader } from "../ui/card"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { StarRateContainer } from "./star-rate-container"
import { useState } from "react"
import toast from "react-hot-toast"
import { postRating } from "@/api/rating/post-rating"
import { useSnapshot } from "valtio"
import { userState } from "@/valtio"
import { User } from "firebase/auth"

type Props = {
  trackId: string
}

export const RatingTrackCard = ({ trackId }: Props) => {

  const [rate, setRate] = useState(0)
  const [rateHover, setRateHover] = useState(0)
  const [comment, setComment] = useState("")
  const { data } = useSnapshot(userState)

  const submitAvaliation = () => {

    if (rate === 0) {
      return toast.error("A avaliação precisa ser de no mínimo 0.5 estrelas")
    }

    if (data) {
      postRating(rate, comment, trackId, data as User)
    }
  }

  return (
    <Card className="w-full rounded-3xl p-4 max-w-[500px] gap-0">
      <CardHeader className="text-center text-slate-500">Avalie essa música</CardHeader>
      <CardContent className="flex flex-col items-center px-0">
        <StarRateContainer rate={rate} rateHover={rateHover} setRate={setRate} setRateHover={setRateHover} />
        <Textarea placeholder="Escreva sua avaliação aqui" className="mt-4 text-xs" value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button disabled={rate === 0} size={"sm"} className="mt-2 self-end" onClick={submitAvaliation}>Enviar avaliação</Button>
      </CardContent>
    </Card>
  )
}