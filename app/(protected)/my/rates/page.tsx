import { RatingContainer } from "@/features/rating/components/rating-container"
import { getUserRatesServer } from "@/features/rating/http/rating.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function RatesPage() {

    const queryClient = new QueryClient()

    await queryClient.ensureQueryData({
        queryKey: ['user-rates'],
        queryFn: getUserRatesServer,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <RatingContainer />
        </HydrationBoundary>
    )
}