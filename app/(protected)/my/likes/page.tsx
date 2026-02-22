import { LikesContainer } from "@/features/like/components/likes-container"
import { getLikesServer } from "@/features/like/http/like.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { Suspense } from "react"

export default async function LikesPage() {

    const queryClient = new QueryClient()

    await queryClient.ensureQueryData({
        queryKey: ["user-likes"],
        queryFn: () => getLikesServer()
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense>
                <LikesContainer />
            </Suspense>
        </HydrationBoundary>
    )


}