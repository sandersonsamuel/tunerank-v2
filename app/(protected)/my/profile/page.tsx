import ProfileContainer from "@/components/layout/pages/profile-page"
import { getLikesServer } from "@/features/like/http/like.server"
import { getReviewsServer } from "@/features/review/http/review.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function ProfilePage() {

    const queryClient = new QueryClient()

    await queryClient.ensureQueryData({
        queryKey: ['user-reviews'],
        queryFn: getReviewsServer,
    })

    await queryClient.ensureQueryData({
        queryKey: ["user-likes"],
        queryFn: () => getLikesServer()
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfileContainer />
        </HydrationBoundary>
    )
}