import { LikesPageContainer } from "@/components/layout/pages/likes-page"
import { getLikesServer } from "@/features/like/http/like.server"
import { QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"

export default function LikesPage() {

    const queryClient = new QueryClient()

    queryClient.ensureQueryData({
        queryKey: ["likes"],
        queryFn: () => getLikesServer()
    })

    return (
        <div className="p-3 w-screen">
            <Suspense>
                <LikesPageContainer />
            </Suspense>
        </div>
    )


}