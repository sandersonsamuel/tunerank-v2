import ProfileContainer from "@/components/layout/pages/profile-page"
import { getLikesServer } from "@/features/like/http/like.server"
import { getUserRatesServer } from "@/features/rating/http/rating.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function ProfilePage() {

    const queryClient = new QueryClient()

    const promises = [
        queryClient.ensureQueryData({
            queryKey: ['user-rates'],
            queryFn: getUserRatesServer,
        }),
        queryClient.ensureQueryData({
            queryKey: ["user-likes"],
            queryFn: () => getLikesServer()
        })
    ]

    await Promise.all(promises)

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProfileContainer />
        </HydrationBoundary>
    )
}