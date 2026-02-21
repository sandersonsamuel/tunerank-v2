import { ReviewContainer } from "@/features/review/components/review-container"
import { getReviewsServer } from "@/features/review/http/review.server"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

export default async function ReviewsPage() {

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['user-reviews'],
        queryFn: getReviewsServer,
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ReviewContainer />
        </HydrationBoundary>
    )
}