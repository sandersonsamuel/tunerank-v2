
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/features/auth/hooks/auth.hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { StarRatingInput } from "../../../components/features/rating/star-rate-container"
import { useReleaseUserRate } from "../hooks/rating.hooks"
import { createRate } from "../http/rating"
import { createRateSchema } from "../schemas/rating.schemas"

type Props = {
    trackId: string
    onSaveAvaliation: () => void
    isSaving: boolean
}

export const TrackRateCard = ({ trackId, onSaveAvaliation, isSaving }: Props) => {

    const router = useRouter()
    const queryClient = useQueryClient()

    const [rate, setRate] = useState(0)
    const [comment, setComment] = useState("")

    const { data: user } = useAuth()
    const { data: rating } = useReleaseUserRate(trackId)

    const { mutateAsync } = useMutation({
        mutationFn: createRate,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['user-rate', trackId],
            })

            queryClient.invalidateQueries({
                queryKey: ['release-rates', trackId],
            })
        }
    })

    const commentChanged = rating?.review !== comment
    const rateChanged = rating?.rating !== rate

    useEffect(() => {
        if (rating) {
            setRate(rating.rating)
            setComment(rating.review || "")
        }
    }, [rating])

    const submitAvaliation = () => {
        if (user) {

            const payload = createRateSchema.safeParse({
                releaseId: trackId,
                rating: rate,
                review: comment,
                type: "TRACK"
            })

            if (payload.success) {
                toast.promise(
                    mutateAsync(payload.data),
                    {
                        success: "Avaliação enviada com sucesso",
                        loading: "Enviando avaliação..."
                    }
                )
            } else {
                toast.error(JSON.parse(payload.error.message)[0].message)
            }

        } else {
            router.push("/auth/login")
        }
    }

    const isUpdateMode = !!rating && rating.rating > 0

    return (
        <Card className="w-full rounded-3xl p-4 max-w-[500px] gap-0 relative">
            <CardHeader className="flex">
                <CardTitle className="text-center text-slate-300 w-full mb-3">{isSaving ? "Minha avaliação" : "Avalie essa música"}</CardTitle>
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
                    isSaving && !comment ? null : (
                        <Textarea placeholder="Escreva sua avaliação aqui" className="mt-4 text-xs max-h-[450px]" value={comment} onChange={(e) => setComment(e.target.value)} />
                    )
                }

                {
                    !isSaving && (commentChanged || rateChanged) && (
                        <div className="flex gap-2 w-full justify-end">
                            <Button size={"sm"} className="mt-2 self-end" onClick={submitAvaliation}>{isUpdateMode ? "Atualizar avaliação" : "Enviar avaliação"}</Button>
                        </div>
                    )
                }

            </CardContent>
        </Card>
    )
}
